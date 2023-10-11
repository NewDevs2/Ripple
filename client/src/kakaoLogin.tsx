import { useEffect } from 'react';
import kakao_login from './kakao_login.png';
// 로그인 상태 관리 모듈
import { useRecoilValue } from 'recoil';
import { isLoggedInState, useSetLoggedInState, useSetUserInformation, userInformationState } from './auth/loginState';

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
  // 로그인 상태일 때 보여질 컴포넌트
  if (isLoggedin) {
    const user_img = userInformation?.profile;
    return <><img src={user_img} alt="카카오톡_프로필 사진"/><div>{userInformation?.id}님 안녕하세요.</div><p>마지막 접속은 {userInformation?.lastConnect}입니다.</p>
    <button onClick={kakaoLogOut}>로그아웃</button></>
  }
  // 로그아웃 상태일 때 보여질 컴포넌트
  return (
        <div onClick={kakaoLogIn}>
          <img src={kakao_login} alt="카카오로그인" /></div>
  )
};

export default Kakao;
