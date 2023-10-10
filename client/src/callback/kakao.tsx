// 클라이언트
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetLoggedInState, useSetUserInformation } from '../auth/loginState';
const KakaoCallback = () => {
  const navigate = useNavigate();
  const setLoggedInState = useSetLoggedInState();
  const setUserInformation = useSetUserInformation();
  useEffect(() => {
    // URL에서 code 값을 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(`최초에 URL의 code 데이터 : ${code}`);
    if (code) {
      // code를 사용하여 서버로 POST 요청
      axios.post('/oauth/kakao', { code })
        .then((response) => {
          // 서버 응답을 처리합니다.
          console.log('서버 응답:', response.data);
          // 유저 정보, 유저 로그인 상태 업데이트
          setLoggedInState(response.data.loginState);
          setUserInformation(response.data.userInformation.id);
          navigate('/');
        })
        .catch((error) => {
          console.error('서버 요청 오류:', error);
        });
    } else {
      console.log("URL에서 code를 찾을 수 없습니다.");
    }
  }, [navigate]);

  return (
    <div>
      카카오 로그인 중
    </div>
  );
}

export default KakaoCallback;
