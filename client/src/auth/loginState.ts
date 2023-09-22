import { atom } from 'recoil';
// 쿠키 유무에 따른 로그인 상태 관리를 위한 atom
export const loginState = atom<boolean>({
  key : 'isloggedinState',
  default :document.cookie.includes('kakao_token'),
});