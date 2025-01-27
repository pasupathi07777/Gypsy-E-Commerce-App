import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';
import { getToken } from '../utils/tokenFunction';



export const addProfilePhoto = createAsyncThunk(
  'add/getproduct',
  async ({image}, {rejectWithValue}) => {
    try {
      console.log(image);

      const profilePic = new FormData();
      profilePic.append('profileImage', {
        uri: image,
        type: 'image/jpeg', 
        name: 'profile.jpg', 
      });

      const token = await getToken();
      const response = await axiosInstance.put(
        '/profile/update-photo',
        profilePic,
        {
          params: {token},
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
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

      // get all product
      .addCase(addProfilePhoto.pending, state => {

      })
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
