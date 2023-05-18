export const nodeServer = {
  // baseUrl: 'https://strongsumin.milk717.com/api/',
  baseUrl: 'http://10.0.2.2:8080/api/',
  getReminder: filter => `reminder/${filter}`,
  getReminderById: id => `reminder/${id}`,
  postReminder: 'reminder',
  patchReminder: id => `reminder/${id}`,
  registerUser: 'auth/register',
  login: 'auth/login',
};

export const springServer = {
  baseUrl: 'https://spring.milk717.com/',
  getReminder: filter => `reminder/${filter}`,
  getReminderById: id => `reminder/${id}`,
  postReminder: 'reminder',
  patchReminder: id => `reminder/${id}`,
  registerUser: 'user/add',
  login: 'signin',
};
