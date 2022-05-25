import { Alert } from 'react-native';
import validator from 'validator';

export const checkOnboardingForm = ({ firstName, lastName, phone, dob }) => {
  if (!firstName || !lastName || !phone || !dob) {
    Alert.alert('Please fill out all fields');
    return false;
  }

  if (!dob) {
    Alert.alert('Please enter a valid date of birth');
    return false;
  }
  if (!firstName.match(/^[a-zA-Z]+$/)) {
    Alert.alert('Please enter a valid first name');
    return false;
  }
  if (!lastName.match(/^[a-zA-Z]+$/)) {
    Alert.alert('Please enter a valid last name');
    return false;
  }

  if (phone.length < 10) {
    Alert.alert('Please enter a valid phone number');
    return false;
  }
  return true;
};

export const checkSignUpForm = ({ email, password }) => {
  if (!email || !password) {
    Alert.alert('Please fill out all fields');
    return false;
  }

  if (!validator.isEmail(email)) {
    Alert.alert('Please enter a valid email');
    return false;
  }
  if (password.length < 8) {
    Alert.alert('Password must be at least 8 characters');
    return false;
  }
  return true;
};
