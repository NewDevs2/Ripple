// 클라이언트
import axios from 'axios';
import { useEffect } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['kakao_token']);

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
          // 서버 응답으로 받은 토큰을 쿠키에 저장
          setCookie('kakao_token', response.data, { path: '/' });
          navigate('/');
        })
        .catch((error) => {
          console.error('서버 요청 오류:', error);
        });
    } else {
      console.log("URL에서 code를 찾을 수 없습니다.");
    }
  }, [navigate, setCookie]);

  return (
    <div>
      카카오 로그인
    </div>
  );
}

export default KakaoCallback;
