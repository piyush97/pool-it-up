// eslint-disable-next-line import/no-unresolved
import { REACT_NATIVE_SUPABASE_ANON_KEY, REACT_NATIVE_SUPABASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = REACT_NATIVE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});

export default supabase;
