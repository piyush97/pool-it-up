import { Alert } from "react-native";

export const checkForm = (email, firstName, lastName, phone, password, dob) => {
  if (!email || !firstName || !lastName || !phone || !password || !dob) {
    Alert.alert("Please fill out all fields");
    return false;
  }

  if (!email.includes("@")) {
    Alert.alert("Please enter a valid email");
    return false;
  }
  if (password.length < 8) {
    Alert.alert("Password must be at least 8 characters");
    return false;
  }

  if (!dob) {
    Alert.alert("Please enter a valid date of birth");
    return false;
  }
  if (!firstName.match(/^[a-zA-Z]+$/)) {
    Alert.alert("Please enter a valid first name");
    return false;
  }
  if (!lastName.match(/^[a-zA-Z]+$/)) {
    Alert.alert("Please enter a valid last name");
    return false;
  }

  if (phone.length < 10) {
    Alert.alert("Please enter a valid phone number");
    return false;
  }
  return true;
};
