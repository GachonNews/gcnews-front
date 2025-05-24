import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import PageTopLeftLabel from '../components/PageTopLeftLabel';
<<<<<<< HEAD
import Input from '../components/Input';
=======
>>>>>>> 80a5f2b11ab1b751788e62ad4499435faa7af000
import ArrowButton from '../components/ArrowButton';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    id: '',
<<<<<<< HEAD
=======
    email: '',
>>>>>>> 80a5f2b11ab1b751788e62ad4499435faa7af000
    pw: '',
    pwConfirm: ''
  });

<<<<<<< HEAD
=======
  const [errors, setErrors] = useState({});

>>>>>>> 80a5f2b11ab1b751788e62ad4499435faa7af000
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.pw !== form.pwConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 백엔드 연동 시 회원가입 처리
=======
  const validate = () => {
    const newErrors = {};
    if (form.name.trim().length < 1) newErrors.name = '이름을 한 글자 이상 작성해주세요.';
    if (form.id.trim().length < 5) newErrors.id = '아이디는 5글자 이상이어야 합니다.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = '유효한 이메일 형식이 아닙니다.';
    if (form.pw.length < 8) newErrors.pw = '비밀번호는 8글자 이상 입력해주세요.';
    if (form.pw !== form.pwConfirm) newErrors.pwConfirm = '비밀번호가 일치하지 않습니다.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

>>>>>>> 80a5f2b11ab1b751788e62ad4499435faa7af000
    console.log('회원가입 정보:', form);
    navigate('/signup-complete');
  };

  return (
    <div className='container'>
<<<<<<< HEAD
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
=======
      <div className='signup-container'>
        <PageTopLeftLabel />
        <h2 className='form-title'>회원가입</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="input-box" />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="id">아이디</label>
            <input id="id" name="id" type="text" value={form.id} onChange={handleChange} className="input-box" />
            {errors.id && <div className="error-text">{errors.id}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input id="email" name="email" type="text" value={form.email} onChange={handleChange} className="input-box" />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="pw">비밀번호</label>
            <input id="pw" name="pw" type="password" value={form.pw} onChange={handleChange} className="input-box" />
            {errors.pw && <div className="error-text">{errors.pw}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="pwConfirm">비밀번호 확인</label>
            <input id="pwConfirm" name="pwConfirm" type="password" value={form.pwConfirm} onChange={handleChange} className="input-box" />
            {errors.pwConfirm && <div className="error-text">{errors.pwConfirm}</div>}
          </div>

          {/* 화살표 버튼 */}
          <ArrowButton type="submit" className="arrow-btn" />
        </form>
      </div>
>>>>>>> 80a5f2b11ab1b751788e62ad4499435faa7af000
    </div>
  );
}
