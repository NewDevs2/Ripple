import kakao_login from './kakao_login.png';
const Kakao = () : JSX.Element => {

  return (<a href='https://kauth.kakao.com/oauth/authorize?client_id=9da388ef82d7b351156a7e2e0772c757&redirect_uri=http://localhost:3000&response_type=code'>
  <img src={kakao_login} alt="카카오로그인" />
  </a>)
};

export default Kakao;