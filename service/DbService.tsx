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

/**
 * @description - This function is used to get the ride details from the database
 * @param id
 * @returns {Ride} - returns the ride details
 */
export const getRideData = async (id: string) =>
  await supabase.from('Rides').select('*').eq('id', id).single();

/**
 * @description - This function is used to insert the ride details to the database after Payment
 * @param {string} email - The email of the user
 * @param {string} rideId - The ride id of the ride
 * @param {string} paymentMethod - The payment method of the ride
 * @author - Piyush Mehta <me@piyushmehta.com>
 */
export const paymentRecord = async (
  email: string,
  rideId: string,
  paymentMethod: string,
  Ride: any
) =>
  await supabase
    .from('Rides')
    .update([
      {
        passengers: [
          {
            payment_method: paymentMethod,
            email: email,
          },
        ],
      },
    ])
    .eq('id', rideId)
    .then(
      async () =>
        await supabase
          .from('User')
          .update([
            [
              {
                id: rideId,
                paymentMethod: paymentMethod,
                Ride: Ride,
              },
            ],
          ])
          .eq('email', email)
    );

const dbService = {
  getUserData,
  submitUserData,
  getRideData,
  paymentRecord,
};
export default dbService;
