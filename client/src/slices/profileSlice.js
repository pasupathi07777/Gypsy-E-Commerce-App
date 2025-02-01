import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/axios';
import {getToken} from '../utils/tokenFunction';
import {updateCurrentUser} from './loginSlice';

export const addProfilePhoto = createAsyncThunk(
  'profile/updatePhoto',
  async (profilePic, {rejectWithValue, dispatch, getState}) => {
    try {
      console.log(profilePic);
      const token = await getToken();
      const response = await axiosInstance.put(
        '/profile/update-photo',
        {profilePic},
        {
          params: {token},
        },
      );
      dispatch(updateCurrentUser(response.data.user));
      return response.data;
    } catch (err) {
      console.log(err);
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  currentUser: {},
  updateProfileLoading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(addProfilePhoto.pending, state => {
        state.updateProfileLoading = true;
      })
      .addCase(addProfilePhoto.fulfilled, (state, action) => {
        console.log(action.payload);
        state.updateProfileLoading = false;
      })
      .addCase(addProfilePhoto.rejected, (state, action) => {
        console.log(action.payload);
        state.updateProfileLoading = false;
      });
  },
});

export const profileStates = state => state.profileReducer;
export default profileSlice.reducer;
