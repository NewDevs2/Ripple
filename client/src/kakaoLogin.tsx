import axios from 'axios';
import kakao_login from './kakao_login.png';
import React, {useEffect} from 'react';
const Kakao = () : JSX.Element => {
  useEffect(() => {
    // URL에서 code 추출
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      // 서버로 code 전송
      sendCodeToServer(code);
    }
  }, []);
  const sendCodeToServer = (code : any) => {
    
    axios.post('auth/kakao', { code })
    .then((response) => {
      // 서버에서의 응답 처리
      console.log('서버 응답:', response.data);
      // 필요한 로직을 수행하거나 서버 응답을 활용
    })
    .catch((error) => {
      // 에러 처리
      console.error('서버 요청 실패:', error);
    });
  };
  const Rest_api_key='e13169ec36f699296518921c6bd1fbd7' //REST API KEY
  const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=e13169ec36f699296518921c6bd1fbd7&redirect_uri=http://localhost:3000/auth&response_type=code`
function request_kakao() {
  window.location.href = kakaoURL;
}
const code = new URL(window.location.href).searchParams.get("code");
console.log(code);
  return (<div onClick={request_kakao}>
  <img src={kakao_login} alt="카카오로그인" />
  </div>)
};

export default Kakao;