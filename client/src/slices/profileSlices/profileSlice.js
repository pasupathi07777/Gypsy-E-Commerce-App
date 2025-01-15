import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/axios';
import {getToken} from '../../utils/tokenFunction';
import {updateCurrentUser} from '../authSlices/loginSlice';
import {Alert} from 'react-native';
import {validateFields} from '../../utils/validationFunction';

export const updateProfilePhoto = createAsyncThunk(
  'update/profilePhoto',
  async (profilePic, {rejectWithValue, dispatch}) => {
    try {
      const response = await axiosInstance.put(`/profile/update-photo`, {
        profilePic,
        token: await getToken(),
      });
      dispatch(updateCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const updateProfileDetails = createAsyncThunk(
  'update/profileDetails',
  async (data, {rejectWithValue, dispatch}) => {
    try {
      const error = validateFields(data);
      if (error) {
        return rejectWithValue({error});
      }
      const response = await axiosInstance.put(`/profile/update-details`, {
        data,
        token: await getToken(),
      });
      dispatch(updateCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);




export const updateEmail = createAsyncThunk(
  'update/Email',
  async (data, {rejectWithValue, dispatch}) => {

    
    try {
      const error = validateFields(data);
      if (error) {
        return rejectWithValue({error});
      }
      const response = await axiosInstance.post(`/profile/verify-email`, {
        email:data.email,
        token: await getToken(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);


export const verifyEmailOtp = createAsyncThunk(
  'verify/otp',
  async (otp, {rejectWithValue, dispatch}) => {
    console.log(otp);
    const otpValue = otp.join('');
    
    try {
      const response = await axiosInstance.post(`/profile/verify-otp`, {
        otp:otpValue,
        token: await getToken(),
      });
      dispatch(updateCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    updateProfileLoading: false,
    updateProfileDetailsLoading: false,
    updateEmailLoading: false,
    verifyEmailLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(updateProfilePhoto.pending, state => {
        state.updateProfileLoading = true;
      })
      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
        console.log(action.payload);
      })
      .addCase(updateProfilePhoto.rejected, (state, action) => {
        state.updateProfileLoading = false;
        console.log(action.payload);
      })

      .addCase(updateProfileDetails.pending, state => {
        state.updateProfileDetailsLoading = true;
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        state.updateProfileDetailsLoading = false;
        Alert.alert('', 'Profile Updated Successfully.');
      })
      .addCase(updateProfileDetails.rejected, (state, action) => {
        state.updateProfileDetailsLoading = false;
        console.log(action.payload);
        Alert.alert('', action.payload.error.message);
      })

      .addCase(updateEmail.pending, state => {
        state.updateEmailLoading = true;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.updateEmailLoading = false;
        Alert.alert('', 'Verify Otp');
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.updateEmailLoading = false;
        // console.log(action.payload.error);
        Alert.alert('', action.payload.error.message);
      })

      .addCase(verifyEmailOtp.pending, state => {
        state.verifyEmailLoading = true;
      })
      .addCase(verifyEmailOtp.fulfilled, (state, action) => {
        state.verifyEmailLoading = false;
        Alert.alert('', 'Email Updated Successfully');
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.verifyEmailLoading = false;
        console.log(action.payload.error);
        Alert.alert('', action.payload.error.message);
      });
  },
});

export const {} = profileSlice.actions;
export const profileState = state => state.profileReducer;
export default profileSlice.reducer;
