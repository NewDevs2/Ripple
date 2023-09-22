import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { loginState } from './auth/loginState';
import kakao_login from './kakao_login.png';

const Kakao = () : JSX.Element => {
  // 로그인 상태관리
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  // 로그인 때 이동 할 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_kakao_client_id}&redirect_uri=${process.env.REACT_APP_kakao_restAPI_key}&response_type=code`
  // 쿠키
  const [cookies, , removeCookie] = useCookies(['kakao_token']);

  const kakaoLogIn = () => {
    window.location.href = kakaoURL;
    // 로그인
    setIsLoggedIn(true);
  }

  const kakaoLogOut = () => {
    // 로그아웃
    setIsLoggedIn(false);
    // 쿠키 삭제
    removeCookie('kakao_token'); // 쿠키 이름만 전달
  }

  return (
    <div>
      {isLoggedIn ? (
        <div onClick={kakaoLogOut}>로그아웃</div>
      ) : (
        <div onClick={kakaoLogIn}>
          <img src={kakao_login} alt="카카오로그인" />
        </div>
      )}
    </div>
  )
};

export default Kakao;
