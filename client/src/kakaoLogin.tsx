import kakao_login from './kakao_login.png';
const Kakao = () : JSX.Element => {
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