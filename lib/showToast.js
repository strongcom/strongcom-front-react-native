import Toast from 'react-native-toast-message';

const showToast = ({type, text1, text2 = null}) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    topOffset: 70,
  });
};

export default showToast;
