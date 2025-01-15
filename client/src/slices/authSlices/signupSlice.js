import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {validateFields} from '../../utils/validationFunction';
import { Alert } from 'react-native';
import { axiosInstance } from '../../utils/axios';


export const signupUser = createAsyncThunk(
  'auth/signup',
  async (credentials, {rejectWithValue}) => {
    try {
      const error = validateFields(credentials);
      if (error) {
        return rejectWithValue({message: error});
      }
      const response = await axiosInstance.post(
        `/auth/signup`,
        credentials,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error.message ||  "something went wrong" );
    }
  },
);

const initialState = {
  loading: false,
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading.signup = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading.signup = false;
         Alert.alert('', 'Signup successful. You can now log in!');
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading.signup = false;
         Alert.alert('', action.payload);
      });
  },
});

export const {} = signupSlice.actions;
export const signupState = state => state.signupReducer;
export default signupSlice.reducer;
