import kakao_login from './kakao_login.png';
const Kakao = () : JSX.Element => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_kakao_client_id}&redirect_uri=${process.env.REACT_APP_kakao_restAPI_key}&response_type=code`
function request_kakao() {
  window.location.href = kakaoURL;
}

  return (<div onClick={request_kakao}>
  <img src={kakao_login} alt="카카오로그인" />
  </div>)
};

export default Kakao;