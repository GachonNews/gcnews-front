import { useState } from 'react';
import {loginUser} from "../apis/auth";

import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import PageHeader from '../components/PageHeader';
import ArrowButton from '../components/ArrowButton';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ loginId: '', password: '' });
  const [error, setError] = useState(null); // 에러 상태

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginUser ({ loginId: form.loginId, password: form.password });

      localStorage.setItem("token", response.data.token);
      alert("로그인 성공!");
      navigate("/news");
    } catch (err){
      setError(err.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div className='container'>
      <form className="login-container" onSubmit={handleSubmit}>
        <h2 className="form-title">로그인</h2>

        <label htmlFor="loginId">아이디</label>
        <input 
          loginId="loginId" 
          name = "loginId"
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

        <ArrowButton type="submit"/>
        {error && <p style={{color: "red"}}>{error}</p>}

      </form>
    </div>
  );
}
