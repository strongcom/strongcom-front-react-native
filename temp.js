const message = {
  priority: 'high',
  notification: {
    sound: 'default',
  },
};
const message2 = {
  headers: {},
  payload: {
    aps: {
      sound: 'default',
      'content-available': 1,
    },
  },
};
console.log(JSON.stringify(message));
console.log(JSON.stringify(message2));
