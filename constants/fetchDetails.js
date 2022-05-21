import supabase from '../lib/supabase';

const fetchDetails = ({ flowType, email, password }) => {
  if (flowType === 0) {
    return {
      title: 'Login',
      bottomNavigationText: 'Dont have an account?',
      bottomNavigationLink: 'SignUp',
      buttonText: 'Register',
      onButtonPress: async () =>
        supabase.auth.signIn({
          email,
          password,
        }),
      nextScreen: 'HomeScreen',
    };
  }
  return {
    title: 'Register',
    bottomNavigationText: 'Already have an account?',
    bottomNavigationLink: 'SignIn',
    buttonText: 'Login',
    onButtonPress: async () =>
      supabase.auth.signUp({
        email,
        password,
      }),
    nextScreen: 'Onboarding',
  };
};
export default fetchDetails;
