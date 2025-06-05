import { useState } from "react";
import { loginUser } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PageHeader from "../components/PageHeader";
import ArrowButton from "../components/ArrowButton";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        loginId: form.loginId,
        password: form.password,
      });

      // 여러 가능한 경로로 토큰 찾기
      let token =
        response.data.token ||
        response.data.data?.token ||
        response.data.accessToken ||
        response.data.data?.accessToken;

      if (token) {
        localStorage.setItem(LOCAL_STORAGE_KEY.token, token);
        console.log("토큰 저장 완료:", token);
        alert("로그인 성공!");
        navigate("/news");
      } else {
        console.error("토큰을 찾을 수 없습니다. 응답 구조를 확인하세요.");
        setError("로그인 응답에서 토큰을 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      setError(err.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div className="container">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2 className="form-title">로그인</h2>

        <label htmlFor="loginId">아이디</label>
        <input
          loginId="loginId"
          name="loginId"
          type="text"
          value={form.loginId}
          onChange={handleChange}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          loginId="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <ArrowButton type="submit" />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
