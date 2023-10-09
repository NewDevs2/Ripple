import { atom } from 'recoil';

export const loginState = atom<boolean>({
  key: 'loginState',
  default: false, // 기본값 : 로그아웃 상태
});
