import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupComplete from "./pages/SignupComplete";
import MyPage from "./pages/MyPage";
import EditProfile from "./pages/EditProfile";
import Layout from "./components/Layout";

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
