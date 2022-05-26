// eslint-disable-next-line import/no-unresolved
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { REACT_NATIVE_SUPABASE_ANON_KEY, REACT_NATIVE_SUPABASE_URL } from 'react-native-dotenv';

const supabaseUrl = REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = REACT_NATIVE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});

export default supabase;
