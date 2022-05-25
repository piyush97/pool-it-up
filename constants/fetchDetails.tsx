import supabase from '../lib/supabase';
import { SIGN_IN, SIGN_UP } from './routesConstants';

const fetchDetails = ({ flowType }) => {
  if (flowType === 0) {
    return {
      title: 'Login',
      bottomNavigationText: 'Dont have an account?',
      bottomNavigationLink: SIGN_UP,
      buttonText: 'Register',
    };
  }
  return {
    title: 'Register',
    bottomNavigationText: 'Already have an account?',
    bottomNavigationLink: SIGN_IN,
    buttonText: 'Login',
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
