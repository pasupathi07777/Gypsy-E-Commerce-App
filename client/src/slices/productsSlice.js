import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getToken } from '../utils/tokenFunction';
import { axiosInstance } from '../utils/axios';




const initialState = {
  products: [],
  getProductLoading: false,

};

export const getProduct = createAsyncThunk(
  'add/getproduct',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/product/get`, {
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


export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // get all product
      .addCase(getProduct.pending, state => {
        state.getProductLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductLoading = false;
        state.products = action.payload.products;
        console.log(state.products);  
        
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProductLoading = false;
        console.log(action.payload);

      })

  },
});

export const productStates = state => state.productsReducer;
export default productsSlice.reducer;
