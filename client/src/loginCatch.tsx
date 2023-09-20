import jwt from 'jsonwebtoken';
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
const LoginCatch = (): JSX.Element => {
  const [cookies, setCookie, removeCookie] = useCookies(['kakao_token']);
  useEffect(() => {
    // 쿠키 데이터 확인
    if (cookies.kakao_token) {
      const kakaoToken = cookies.kakao_token;
      
      console.log(`컴포넌트가 만든 꾸끼${kakaoToken}`);
      const decoded = jwt.decode(kakaoToken);
      console.log(decoded);
    }
  }, [cookies.kakao_token]);

  return (
    <div>
      <h2>유저 정보?</h2>
    </div>
  );
}

export default LoginCatch;
