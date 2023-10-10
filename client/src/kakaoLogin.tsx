import kakao_login from './kakao_login.png';
// 로그인 상태를 구독
import { isLoggedInState, userInformationState } from './auth/loginState';
import { useRecoilValue } from 'recoil';
const Kakao = () : JSX.Element => {
  interface UserInfo {
    id: number;
  }
  // 로그인 상태 관리
  const isLoggedin = useRecoilValue(isLoggedInState);
  const userInformation = useRecoilValue(userInformationState);
  // 토큰 상태 관리
  // 로그인 때 이동 할 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_kakao_client_id}&redirect_uri=${process.env.REACT_APP_kakao_restAPI_key}&response_type=code`
  // 쿠키
  // const [cookies,,removeCookie] = useCookies(['kakao_token']);
  // useEffect(()=> {
  //   // 만약 카카오 토큰이 있으면 컴포넌트 재실행
  //   if(cookies.kakao_token) {
  //     console.log(`카카오 토큰 있고 컴포넌트 재실행 됨${cookies.kakao_token}`);
  //     setIsLoggedIn(true);
  //   }
  // },[cookies, setIsLoggedIn])
  const kakaoLogIn = () => {
    // 로그인
    window.location.href = kakaoURL;
  }

  // const kakaoLogOut = () => {
    // 쿠키 삭제
    // removeCookie('kakao_token');
    // 로그아웃
  //   setIsLoggedIn(false);
  // }

  if (!isLoggedin) {
    return <div>{userInformation?.id}님 안녕하세요.</div>
  }
  return (
        <div onClick={kakaoLogIn}>
          <img src={kakao_login} alt="카카오로그인" /></div>
  )
};

export default Kakao;
