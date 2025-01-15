// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import backendUrl from '../../api/backendUrl';

// const PORT = backendUrl();


// export const verifyOtp = createAsyncThunk(
//   'otp/verifyOtp',
//   async (data, thunkAPI) => {
//     const {otpCode, verfiyEmail} = data;
//     try {
//       const response = await axios.post(`${PORT}/api/auth/verifyOTP`, {
//         otp: otpCode,
//         email: verfiyEmail,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error?.response?.data || error.message || 'Something went wrong',
//       );
//     }
//   },
// );

// // OTP Slice
// export const profileSlice = createSlice({
//   name: 'profile',
//   initialState: {
//     editProfile: false,
//   },
//   reducers: {
//     setEdiProfile: state => {
//       state.editProfile = !state.editProfile;
//     },
//   },
//   extraReducers: builder => {
//     builder;
//     //   .addCase(verifyOtp.pending, state => {
//     //     state.loading = true;
//     //     state.error = null;
//     //     state.success = false;
//     //   })
//     //   .addCase(verifyOtp.fulfilled, (state, action) => {
//     //     state.loading = false;
//     //     state.success = true;
//     //     console.debug('OTP Verified:', action.payload);
//     //     state.otp = ['', '', '', '', ''];
//     //   })
//     //   .addCase(verifyOtp.rejected, (state, action) => {
//     //     state.loading = false;
//     //     state.OtpErrors = action.payload.error.error || 'Failed to verify OTP';
//     //     console.error('OTP verification error:', action.payload.error.error);
//     //   });
//   },
// });

// export const {setEdiProfile} = profileSlice.actions;
// export const profileState = state => state.profileReducer;
// export default profileSlice.reducer;
