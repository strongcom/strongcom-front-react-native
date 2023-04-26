export const settingList = [
  {
    key: 0,
    menuName: '로그아웃',
  },
  {key: 2, menuName: '이미지 추가등록'},
  {key: 3, menuName: '도움말'},
  {key: 4, menuName: '오픈소스 라이센스'},
];

export const repetitionList = [
  {key: 0, text: '반복 안함', value: ''},
  {key: 1, text: '매일', value: 'DAILY'},
  {
    key: 2,
    text: '매주',
    value: 'WEEKLY',
    dayList: [
      {key: '2-1', text: '일', value: 'SUN'},
      {key: '2-2', text: '월', value: 'MON'},
      {key: '2-3', text: '화', value: 'THU'},
      {key: '2-4', text: '수', value: 'WED'},
      {key: '2-5', text: '목', value: 'TUR'},
      {key: '2-6', text: '금', value: 'FRI'},
      {key: '2-7', text: '토', value: 'SAT'},
    ],
  },
  {key: 3, text: '매월', value: 'MONTHLY'},
  {key: 4, text: '매년', value: 'YEARLY'},
];
