import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    primary: 'rgb(98, 98, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: '#E6E4BF',
    onPrimaryContainer: 'rgb(29, 29, 0)',
    secondary: 'rgb(96, 96, 67)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: '#D8D6B4',
    onSecondaryContainer: 'rgb(29, 29, 6)',
    tertiary: 'rgb(61, 102, 87)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(191, 236, 216)',
    onTertiaryContainer: 'rgb(0, 33, 23)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(28, 28, 23)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(28, 28, 23)',
    surfaceVariant: 'rgb(230, 227, 209)',
    onSurfaceVariant: 'rgb(72, 71, 58)',
    outline: 'rgb(121, 120, 105)',
    outlineVariant: 'rgb(202, 199, 182)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(49, 49, 43)',
    inverseOnSurface: 'rgb(244, 240, 232)',
    inversePrimary: 'rgb(205, 205, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 243, 242)',
      level2: '#F4F1E4',
      level3: 'rgb(238, 234, 227)',
      level4: 'rgb(236, 233, 224)',
      level5: 'rgb(233, 230, 219)',
    },
    surfaceDisabled: 'rgba(28, 28, 23, 0.12)',
    onSurfaceDisabled: 'rgba(28, 28, 23, 0.38)',
    backdrop: 'rgba(49, 49, 37, 0.4)',
  },
};

export default theme;
