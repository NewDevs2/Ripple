import { atom, useSetRecoilState } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false, // 초기값은 로그아웃 상태
});
// 유저 정보 인터페이스
interface UserInfo {
  lastConnect : string,
  id: number,
  profile : string
}
export const userInformationState = atom<UserInfo | null>({
  key: 'userInformationState',
  default: null, // 초기값은 사용자 정보 없음
});
// 로그인 상태관리 함수
export function useSetLoggedInState() {
  return useSetRecoilState(isLoggedInState);
}
// 유저 정보 상태관리 함수
export function useSetUserInformation() {
  return useSetRecoilState(userInformationState);
}