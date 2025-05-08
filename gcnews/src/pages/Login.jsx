import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import PageHeader from '../components/PageHeader';
import ArrowButton from '../components/ArrowButton';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', pw: '' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', form);
  };

  return (
    <div className='container'>
        <div className="login-container">
      <h2 className="form-title">로그인</h2>

      <label htmlFor="id">아이디</label>
      <input id="id" type="text" />

      <label htmlFor="password">비밀번호</label>
      <input id="password" type="password" />
    </div>
    <ArrowButton type="submit" />
    </div>
  );
}
