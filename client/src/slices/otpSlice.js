import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import backendUrl from '../../api/backendUrl';

const PORT = backendUrl();
export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async (data, thunkAPI) => {
    const {otpCode, verfiyEmail} = data;
    try {
      const response = await axios.post(`${PORT}/api/auth/verifyOTP`, {
        otp: otpCode,
        email: verfiyEmail,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

// OTP Slice
export const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    otp: ['', '', '', '', ''],
    loading: false,
    error: null,
    success: false,
    currentVerifiedEmail: '',
    OtpErrors: '',
    otpForm: {
      errors: null,
    },
  },
  reducers: {
    updateOtp: (state, action) => {
      const {index, value} = action.payload;
      state.otp[index] = value;
      state.otpForm.errors = null;
      state.OtpErrors = null;
    },
    clearOtp: state => {
      state.otp = ['', '', '', '', ''];
      state.error = null;
      state.success = false;
    },
    updateOtpErrors: (state, action) => {
      state.otpForm.errors = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.debug('OTP Verified:', action.payload);
        state.otp = ['', '', '', '', ''];
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.OtpErrors = action.payload.error.error || 'Failed to verify OTP';
        console.error('OTP verification error:', action.payload.error.error);
      });
  },
});

export const {updateOtp, clearOtp, updateOtpErrors} = otpSlice.actions;
export const selectOtpState = state => state.otpReducer;
export default otpSlice.reducer;
