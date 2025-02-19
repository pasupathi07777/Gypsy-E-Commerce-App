import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {validateFields} from '../utils/validationFunction';
import {axiosInstance} from '../utils/axios';
import {updateCurrentEmail} from './loginSlice';


export const signupUser = createAsyncThunk(
  'auth/signup',
  async (credentials, {rejectWithValue, dispatch}) => {
    try {
      const error = validateFields(credentials);
      if (error) {
        return rejectWithValue({error});
      }
      console.log('Sending credentials:', credentials);

      const response = await axiosInstance.post('/auth/signup', credentials);
      console.log('Response:', response.data);
      dispatch(updateCurrentEmail(credentials.email));
      if (response.data.token) {
        await AsyncStorage.setItem('Token', response.data.token);
        const token = await AsyncStorage.getItem('Token');
        console.log(`Token: ${token}`);
      }
      return response.data;
    } catch (err) {
      console.error('Axios error:', err);

      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  signupLoading: false,
  currentEmail: null,
};

export const signupSlice = createSlice({
  name: 'signupSlice',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.signupLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        // console.log('Otp Sent Successful:', action.payload);
        Alert.alert('', 'Otp Sent Successful.');
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupLoading = false;
        // console.error('Signup Rejected:', action.payload);
        Alert.alert(
          'Error',
          action.payload?.error?.message || 'Something went wrong',
        );
      });
  },
});

export const signupState = state => state.signupReducer;
export default signupSlice.reducer;
