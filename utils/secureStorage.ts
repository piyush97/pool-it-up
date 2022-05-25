import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(`🔐 Here's your value 🔐 \n${result}`);
  } else {
    console.log('No values stored under that key.');
  }
}

export default { save, getValueFor };
