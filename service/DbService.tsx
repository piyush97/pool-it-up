/* eslint-disable camelcase */

import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../lib/supabase';

/**
 * @description - This function is used to submit the user details to the database
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @param {string} email - The email of the user
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} dob
 * @param {string} phone
 */
const submitUserData = async (
  email: string,
  first_name: string,
  last_name: string,
  dob: string,
  phone: string
) =>
  supabase.from('Users').insert([
    {
      first_name,
      last_name,
      dob,
      phone,
      email,
    },
  ]);

/**
 * @description - This function is used to get user data
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @returns {User} - returns the user data
 */
export const getUserData = async (email: string): Promise<PostgrestResponse<any>> =>
  await supabase.from('Users').select('*').eq('email', email);

const dbService = {
  getUserData,
  submitUserData,
};
export default dbService;
