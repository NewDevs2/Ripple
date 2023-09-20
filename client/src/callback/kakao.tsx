import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 code 값을 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(`최초에 url의 code 데이터 : ${code}`);
    if (code) {
      // code를 사용하여 서버로 POST 요청
      axios.post('/oauth/kakao', { code })
        .then((response) => {
          // 서버 응답을 처리합니다.
          console.log('서버 응답:', response.data);
          navigate('/');
          document.cookie = `kakao_token=${JSON.stringify(response)}; path=/`;
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
      카카오 로그인
    </div>
  );
}

export default KakaoCallback;
