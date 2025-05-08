import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import PageTopLeftLabel from '../components/PageTopLeftLabel';
import Input from '../components/Input';
import ArrowButton from '../components/ArrowButton';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    id: '',
    pw: '',
    pwConfirm: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.pw !== form.pwConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 백엔드 연동 시 회원가입 처리
    console.log('회원가입 정보:', form);
    navigate('/signup-complete');
  };

  return (
    <div className='container'>
        <div className="signup-container">
      <h2 className="form-title">회원가입</h2>

      <label htmlFor="name">이름</label>
      <input id="name" type="text" />

      <label htmlFor="id">아이디</label>
      <input id="id" type="text" />
      
      <label htmlFor="id">이메일</label>
      <input id="email" type="text" />

      <label htmlFor="password">비밀번호</label>
      <input id="password" type="password" />

      <label htmlFor="confirm">비밀번호 확인</label>
      <input id="confirm" type="password" />
    </div>
    <ArrowButton type="submit" />
    </div>
  );
}
