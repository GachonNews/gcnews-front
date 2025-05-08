import { useNavigate } from 'react-router-dom';
import LogoHeader from '../components/LogoHeader';
import Button from '../components/Button';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
  
    return (
      <div className="home-container">
        <LogoHeader />
        <p className="home-subtitle">세상의 이야기가 당신만의 지식으로,</p>
        <div className="home-buttons">
          <Button label="로그인" onClick={() => navigate('/login')} />
          <Button label="회원가입" onClick={() => navigate('/signup')} />
        </div>
      </div>
    );
  }
  
