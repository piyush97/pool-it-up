import { SocialMediaType } from '@rneui/themed';
import { Alert } from 'react-native';
type socialLoginOptionsType = {
  id: number;
  icon: string;
  type: SocialMediaType;
  login: () => void;
};

const socialLoginOptions: socialLoginOptionsType[] = [
  {
    id: 1,
    icon: 'facebook',
    type: 'facebook',
    login: () => {
      Alert.alert('Facebook');
    },
  },
  {
    id: 2,
    icon: 'google',
    type: 'google',
    login: () => {
      Alert.alert('Google');
    },
  },
  {
    id: 3,
    icon: 'linkedin',
    type: 'linkedin',
    login: () => {
      Alert.alert('LinkedIn');
    },
  },
];

export default socialLoginOptions;
