import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/axios';
import {getToken} from '../utils/tokenFunction';

export const addProfilePhoto = createAsyncThunk(
  'profile/updatePhoto',
  async (profilePic, {rejectWithValue}) => {
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
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(addProfilePhoto.pending, state => {})
      .addCase(addProfilePhoto.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addProfilePhoto.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const profileStates = state => state.profileReducer;
export default profileSlice.reducer;
