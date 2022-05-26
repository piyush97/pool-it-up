import supabase from '../lib/supabase';

/**
 * @description - This function is used to sign in the user
 * @param {string} email
 * @param {string} password
 * @returns {object} - returns the user data
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const signIn = (email: string, password: string) =>
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
const signUp = (email: string, password: string) =>
  supabase.auth.signUp({
    email,
    password,
  });

/**
 * @description - This function is used to sign out the user
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const signOut = () => supabase.auth.signOut();

/**
 * @description - This function is used to get to recover password
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @param {string} email
 */
const forgotPassword = (email: string) => supabase.auth.api.resetPasswordForEmail(email);

/**
 * @description - This function is used to get user details from the database
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
const getUserDetails = async () => supabase.auth.user();

const authService = {
  signIn,
  signUp,
  signOut,
  forgotPassword,
  getUserDetails,
};
export default authService;
