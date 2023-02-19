export const settingList = [
  {
    key: 0,
    menuName: '계정 관리',
    subMenu: [
      {key: 10, menuName: '비밀번호 관리'},
      {key: 11, menuName: '로그아웃'},
      {key: 12, menuName: '회원 탈퇴'},
    ],
  },
  {key: 2, menuName: '알림 설정'},
  {key: 3, menuName: '도움말'},
  {key: 4, menuName: '오픈소스 라이센스'},
];

export const repetitionList = [
  {key: 0, text: '반복 안함', value: ''},
  {key: 1, text: '매일', value: 'DAILY'},
  {
    key: 2,
    text: '매주',
    value: 'w',
    dayList: [
      {key: '2-1', text: '일', value: 'Sun'},
      {key: '2-2', text: '월', value: 'Mon'},
      {key: '2-3', text: '화', value: 'Thu'},
      {key: '2-4', text: '수', value: 'Wed'},
      {key: '2-5', text: '목', value: 'Tur'},
      {key: '2-6', text: '금', value: 'Fri'},
      {key: '2-7', text: '토', value: 'Sat'},
    ],
  },
  {key: 3, text: '매월', value: 'MONTHLY'},
  {key: 4, text: '매년', value: 'YEARLY'},
];
