import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateFields} from '../utils/validationFunction';
import {axiosInstance} from '../utils/axios';
import {updateCurrentEmail, updateCurrentUser} from './loginSlice';

export const verifyOtp = createAsyncThunk(
  'auth/otp',
  async (credentials, {rejectWithValue, dispatch}) => {
    try {
      const error = validateFields(credentials);
      if (error) {
        return rejectWithValue({error});
      }
      console.log('Sending credentials:', credentials);

      const response = await axiosInstance.post(
        '/auth/verify-OTP',
        credentials,
      );
      console.log('Response:', response.data);
      if (response.data.token) {
        await AsyncStorage.setItem('Token', response.data.token);
        const token = await AsyncStorage.getItem('Token');
        console.log(`Stored Token: ${token}`);
      }
      dispatch(updateCurrentUser(response.data.user));
      dispatch(updateCurrentEmail(null));
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
  otpLoading: false,
  currentEmail: null,
};

export const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(verifyOtp.pending, state => {
        state.otpLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        console.log('otp :', action.payload);
        Alert.alert('', 'Otp Verify successful.');
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        console.error('Otp Rejected:', action.payload);
        Alert.alert(
          'Error',
          action.payload?.error?.message || 'Something went wrong',
        );
      });
  },
});

export const {} = otpSlice.actions;
export const otpState = state => state.otpReducer;
export default otpSlice.reducer;
