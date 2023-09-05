import axios from 'axios';
import kakao_login from './kakao_login.png';
const Kakao = () : JSX.Element => {

  function kakaoLogin() {
    axios.get('/auth/kakao')
    .then((response) => {
      const responseData = response.data;
      console.log(response);
      console.log('서버에서 넘어온 데이터:', responseData);
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