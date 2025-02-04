import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getToken } from '../utils/tokenFunction';
import { axiosInstance } from '../utils/axios';

const initialState = {
  getCategoryLoading: false,
  categories: [],
};

export const getCategory = createAsyncThunk(
  'get/Category',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/Category/get`, {
        params: {token},
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);


export const categorySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // get
      .addCase(getCategory.pending, state => {
        state.getCategoryLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.getCategoryLoading = false;
        state.categories = action.payload.categories;
        // console.log(action.payload.categories);
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.getCategoryLoading = false;
        console.log(action.payload);
      });


  },
});

export const {} = categorySlice.actions;
export const categoryStates = state => state.categoryReducer;
export default categorySlice.reducer;
