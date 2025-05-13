import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupComplete from "./pages/SignupComplete";
import MyPage from "./pages/MyPage";
import EditProfile from "./pages/EditProfile";
import Layout from "./components/Layout";
import MainLayout from "./layouts/MainLayout";
import MyPageLayout from "./layouts/MyPageLayout";
import NewsPage from "./pages/NewsPage";
import CalendarPage from './pages/CalendarPage';  // CalendarPage import 추가

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 레이아웃 (홈, 로그인, 회원가입 등) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
        </Route>

        {/* 메인 레이아웃 (뉴스 관련 페이지) */}
        <Route element={<MainLayout />}>
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:category" element={<NewsPage />} />
        </Route>

        {/* 마이페이지 레이아웃 (마이페이지, 프로필 수정 등) */}
        <Route element={<MyPageLayout />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<EditProfile />} />
        </Route>

        {/* 캘린더 페이지 */}
        <Route path="/calendar" element={<CalendarPage />} />  {/* /calendar 경로로 CalendarPage 추가 */}
      </Routes>
    </BrowserRouter>
  );
}
