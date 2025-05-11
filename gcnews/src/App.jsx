// App.jsx
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:category" element={<NewsPage />} />
        </Route>

        <Route element={<MyPageLayout />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
