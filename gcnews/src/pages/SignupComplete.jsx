import { useNavigate } from 'react-router-dom';
import PageTopLeftLabel from '../components/PageTopLeftLabel';
import MessageBox from '../components/MessageBox';
import Button from '../components/Button';
import './SignupComplete.css';

export default function SignupComplete() {
  const navigate = useNavigate();

  return (
    <div className="signup-complete-container">
      <div className="complete-content">
        <MessageBox
          title="회원가입이 완료되었습니다!"
          message="앞으로 세상의 조각들을 모아 여러분의 이야기로 만들어보세요."
        />
        <Button label="로그인" onClick={() => navigate('/login')} />
      </div>
    </div>
  );
}
