import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 code 값을 추출합니다.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(`최초에 url의 code 데이터 : ${code}`);
    if (code) {
      // code를 사용하여 서버로 POST 요청을 보냅니다.
      axios.post('/oauth/kakao', { code }) // 코드를 객체로 감싸서 전송합니다.
        .then((response) => {
          // 서버 응답을 처리합니다.
          console.log('서버 응답:', response.data);

          // 예: 서버로부터 받은 데이터를 활용하여 다른 작업을 수행합니다.

          // 사용자 정보를 가져온 후, 클라이언트 애플리케이션으로 리디렉션 (예: 홈 페이지로)
          navigate('/');
        })
        // 서버에서 받은 토큰 데이터 쿠키에 저장
        .then((JWT_token) => {
          document.cookie = `kakao_token=${JSON.stringify(JWT_token)}; path=/`;
        })
        .catch((error) => {
          console.error('서버 요청 오류:', error);

          // 오류 처리 로직을 추가합니다.
        });
    } else {
      console.log("URL에서 code를 찾을 수 없습니다.");
      // 예: 사용자에게 오류 메시지를 표시하거나 다른 작업을 수행합니다.
    }
  }, [navigate]);

  return (
    <div>
      {/* KakaoCallback 컴포넌트의 내용을 작성하세요 */}
    </div>
  );
}

export default KakaoCallback;
