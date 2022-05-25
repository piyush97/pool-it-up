/* eslint-disable camelcase */

import supabase from '../lib/supabase';

/**
 * @description - This function is used to submit the user details to the database
 * @author - Piyush Mehta <me@piyushmehta.com>
 * @param {} userData
 */
const submitUserData = async (email, first_name, last_name, dob, phone) =>
  supabase.from('Users').insert([
    {
      first_name,
      last_name,
      dob,
      phone,
      email,
    },
  ]);

export default submitUserData;
