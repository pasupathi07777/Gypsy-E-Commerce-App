import AsyncStorage from '@react-native-async-storage/async-storage';
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('Token');
    if (token) {
      return token;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};
