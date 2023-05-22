export const nodeServer = {
  baseUrl: 'https://strongsumin.milk717.com/api/',
  // baseUrl: 'http://10.0.2.2:8080/api/',
  getReminder: filter => `reminder/${filter}`,
  getReminderById: id => `reminder/${id}`,
  getUserInfo: '/auth/userinfo',
  postReminder: 'reminder',
  patchReminder: id => `reminder/${id}`,
  registerUser: 'auth/register',
  login: 'auth/login',
  kakao: 'auth/kakao',
  postUsername: 'auth/username',
};

export const springServer = {
  baseUrl: 'https://spring.milk717.com/',
  getReminder: filter => `reminder/${filter}`,
  getReminderById: id => `reminder/${id}`,
  getUserInfo: 'user',
  postReminder: 'reminder',
  patchReminder: id => `reminder/${id}`,
  registerUser: 'user/add',
  login: 'signin',
  kakao: 'kakao/add',
  postUsername: 'kakao/user',
};
