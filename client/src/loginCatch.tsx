import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

const LoginCatch = (): JSX.Element => {
  const [cookies] = useCookies(['kakao_token']);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    // 쿠키 데이터 확인
    const kakaoToken = cookies.kakao_token;
    if (kakaoToken) {
      try {
        // 쿠키 값을 파싱하여 JWT 토큰을 가져옵니다.
        const token = JSON.parse(kakaoToken);

        // JWT 토큰의 payload 부분을 Base64Url 디코딩합니다.
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        setDecodedToken(JSON.parse(jsonPayload));
      } catch (error) {
        console.error('Invalid kakao_token:', kakaoToken);
      }
    }
  }, [cookies.kakao_token]);

  return (
    <div>
      <h2>유저 정보</h2>
      {decodedToken && (
        <div>
          <p>ID: {decodedToken.id}</p>
          <p>Connected At: {decodedToken.connected_at}</p>
          <img src={decodedToken.properties.profile_image} alt="Profile" />
        </div>
      )}
    </div>
  );
}

export default LoginCatch;
