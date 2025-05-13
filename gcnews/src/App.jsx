// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupComplete from "./pages/SignupComplete";
import MyPage from "./pages/MyPage";
import EditProfile from "./pages/EditProfile";
import Layout from "./components/Layout"; // Layout 컴포넌트 import
import CalendarPage from "./pages/CalendarPage";

 // CalendarPage import

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/calendar" element={<CalendarPage />} />  {/* 캘린더 페이지 라우팅 */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
