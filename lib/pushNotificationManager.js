import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

const showToast = ({text1}) => {
  Toast.show({
    type: 'info',
    text1: text1,
    text2: '알림이 왔어요',
    position: 'bottom',
    bottomOffset: 100,
  });
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFCMToken();
  }
}

async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
    try {
      let newToken = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', newToken);
      console.log(newToken);
    } catch (e) {
      console.log(e);
    }
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    showToast({
      text1: remoteMessage.notification.title,
    });
    console.log('notification on foreground state...', remoteMessage);
  });
};
