import axios from 'axios';
import kakao_login from './kakao_login.png';
const Kakao = () : JSX.Element => {

  function kakaoLogin() {
    axios.get('/auth/kakao')
    .then((response) => {
      console.log('카카오 로그인 요청 성공적으로 전송');
    })
    .catch((error) => {
      console.error('카카 오 로그인 요청 실패:', error);
    });
  };
  return (<div onClick={kakaoLogin}>
  <img src={kakao_login} alt="카카오로그인" />
  </div>)
};

export default Kakao;