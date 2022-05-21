import { Alert } from 'react-native';

const socialLoginOptions = [
  {
    id: 1,
    icon: 'facebook',
    type: 'facebook',
    login: async () => {
      Alert.alert('Facebook');
    },
  },
  {
    id: 2,
    icon: 'google',
    type: 'google',
    login: async () => {
      Alert.alert('Google');
    },
  },
  {
    id: 3,
    icon: 'linkedin',
    type: 'linkedin',
    login: async () => {
      Alert.alert('LinkedIn');
    },
  },
];

export default socialLoginOptions;
