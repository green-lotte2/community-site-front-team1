import MemberLayout from '../../layout/MemberLayout';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CompletePage = () => {

  const location = useLocation();
  const user = location.state?.user;

  return (
    <MemberLayout>
    <section className="memberBack completeBack">
        <div id="completeBox">
            <p>회원가입이 완료되었습니다.</p>
            <p>회원님의 아이디는 <span>{user}</span> 입니다.</p>

            <Link to="/login" className="singupText">로그인</Link>
        </div>
    </section>
    </MemberLayout>
  )
}

export default CompletePage