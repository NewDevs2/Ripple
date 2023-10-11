import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import kakao_login from './kakao_login.png';
// 로그인 상태 값
import { isLoggedInState, userInformationState } from './auth/loginState';
// 로그인 상태 관리 함수
import { useSetLoggedInState, useSetUserInformation } from './auth/loginState';
const Kakao = () : JSX.Element => {
  // 로그인 상태 값
  const isLoggedin = useRecoilValue(isLoggedInState);
  const userInformation = useRecoilValue(userInformationState);
  // 로그인 상태 관리 함수
  const setLoggedInState = useSetLoggedInState();
  const setUserInformation = useSetUserInformation();

  // 로그인 때 이동 할 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_kakao_client_id}&redirect_uri=${process.env.REACT_APP_kakao_restAPI_key}&response_type=code`
  
  // 로그인
  const kakaoLogIn = () => {
    window.location.href = kakaoURL;
  }
  // 로그아웃
  const kakaoLogOut = () => {
    // 로그인 상태, 유저 정보 초기화
    setLoggedInState(false);
    setUserInformation(null);
  }
  useEffect(() => {
  console.log(isLoggedin);
  console.log(userInformation);
  }, [isLoggedin, userInformation]);
  if (isLoggedin) {
    return <><div>{userInformation}님 안녕하세요.</div>
    <button onClick={kakaoLogOut}>로그아웃</button></>
  }
  return (
        <div onClick={kakaoLogIn}>
          <img src={kakao_login} alt="카카오로그인" /></div>
  )
};

export default Kakao;
