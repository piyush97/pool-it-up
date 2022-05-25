import supabase from '../lib/supabase';

/**
 * @description - This function is used to sign in the user
 * @param {string} email
 * @param {string} password
 * @returns {object} - returns the user data
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const signIn = (email, password) =>
  supabase.auth.signIn({
    email,
    password,
  });
/**
 * @description - This function is used to sign up the user
 * @param {string} email
 * @param {string} password
 * @returns {object} - returns the user data
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const signUp = (email, password) =>
  supabase.auth
    .signUp({
      email,
      password,
    })
    .then(() => {
      console.log('signed up');
    })
    .catch((err) => {
      console.log('err', err);
    });

/**
 * @description - This function is used to sign out the user
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const signOut = () =>
  supabase.auth
    .signOut()
    .then(() => {
      console.log('Logged out');
    })
    .catch((err) => {
      console.log('err', err);
    });
/**
 * @description - This function is used to get to recover password
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @param {string} email
 */
const forgotPassword = (email) =>
  supabase.auth.api
    .resetPasswordForEmail(email)
    .then(() => {
      console.log('forgot password');
    })
    .catch((err) => {
      console.log('err', err);
    });

const authService = {
  signIn,
  signUp,
  signOut,
  forgotPassword,
};
export default authService;
