import supabase from '../lib/supabase';
import { HOME, ONBOARDING, SIGN_IN } from './routesConstants';

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
      nextScreen: HOME,
    };
  }
  return {
    title: 'Register',
    bottomNavigationText: 'Already have an account?',
    bottomNavigationLink: SIGN_IN,
    buttonText: 'Login',
    onButtonPress: async () =>
      supabase.auth.signUp({
        email,
        password,
      }),
    nextScreen: ONBOARDING,
  };
};

export const profileDetails = [
  {
    id: 1,
    title: 'Personal Data',
    function: async (id) => {
      await supabase
        .from('Users')
        .select('*')
        .eq('id', id)
        .then((res) => {
          console.log('data', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
  },

  {
    id: 2,
    title: 'Payment',
  },
  {
    id: 3,
    title: 'Settings',
  },
  {
    id: 4,
    title: 'Help',
  },
  {
    id: 5,
    title: 'Logout',
    function: async () => {
      await supabase.auth.signOut().then(() => {
        console.log('Logged out');
      });
    },
  },
];
export default fetchDetails;
