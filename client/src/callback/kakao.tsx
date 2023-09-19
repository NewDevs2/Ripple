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
      // 카카오에서 받아온 code를 사용하여 서버로 POST 요청
      axios.post('/oauth/kakao', { code })
        .then((response) => {
          console.log('서버 응답:', response.data);
          // 서버에서 받은 토큰 데이터 쿠키에 저장
          document.cookie = `kakao_token=${JSON.stringify(response)}; path=/`;
          // 메인 페이지로 이동
          alert('로그인에 성공했습니다.');
          navigate('/');
        })
        .catch((error) => {
          alert('로그인 할 수 없습니다.');
          console.error('서버 요청 오류:', error);
        });
    } else {
      console.log("URL에서 code를 찾을 수 없습니다.");
    }
  }, [navigate]);

  return (
    <div>
    </div>
  );
}

export default KakaoCallback;
