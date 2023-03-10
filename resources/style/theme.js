import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    primary: '#3a6a1d',
    onPrimary: '#ffffff',
    primaryContainer: '#baf295',
    onPrimaryContainer: '#092100',
    secondary: '#56624b',
    onSecondary: '#ffffff',
    secondaryContainer: '#d9e7ca',
    onSecondaryContainer: '#141e0d',
    tertiary: '#386666',
    onTertiary: '#ffffff',
    tertiaryContainer: '#bbebeb',
    onTertiaryContainer: '#002020',
    error: '#ba1a1a',
    errorContainer: '#ffdad6',
    onError: '#ffffff',
    onErrorContainer: '#410002',
    background: '#fdfdf5',
    onBackground: '#1a1c18',
    surface: '#fdfdf5',
    onSurface: '#1a1c18',
    surfaceVariant: '#e0e4d6',
    onSurfaceVariant: '#43483e',
    outline: '#74796d',
    inverseOnSurface: '#f1f1ea',
    inverseSurface: '#2f312c',
    inversePrimary: '#9fd67c',
    shadow: '#000000',
    surfaceTint: '#3a6a1d',
    outlineVariant: '#c4c8bb',
    scrim: '#000000',
    elevation: {
      level0: 'rgb(245,248,240)',
      level1: 'rgb(239, 246, 234)',
      level2: 'rgb(232, 242, 226)',
      level3: 'rgb(224, 237, 219)',
      level4: 'rgb(222, 236, 217)',
      level5: 'rgb(217, 233, 212)',
    },
    surfaceDisabled: 'rgba(26, 28, 24, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 24, 0.38)',
    backdrop: 'rgba(44, 50, 41, 0.4)',
  },
};

export default theme;
