import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getToken} from '../utils/tokenFunction';
import {axiosInstance} from '../utils/axios';
import { updateCart } from './cartSlice';

const initialState = {
  wishlist: [],
  getWishlistLoading: false,
  postWishlistLoading: false,
  deleteWishlistLoading: false,
  addAllToCartLoading: false,
};


export const getwishlist = createAsyncThunk(
  'add/wishlist',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/wishlist/get-wishlist`, {
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



export const postWishlist = createAsyncThunk(
  'post/wishlist',
  async (credentials, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.post(
        `/wishlist/post-whislist`,
        credentials,
        {
          params: {token},
        },
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);



export const removeWishlist = createAsyncThunk(
  'delete/wishlist',
  async (credentials, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.delete(
        `/wishlist/wishlist-delete/${credentials}`,
        {
          params: {token},
        },
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

export const addAllToCart = createAsyncThunk(
  'add/addAllToCart',
  async (credentials, {rejectWithValue, dispatch, getState}) => {
    try {
      const token = await getToken();
      const {wishlist} = getState().wishlistReducer; // Get wishlist from Redux state
      console.log(wishlist);

      const wishlistIds = wishlist.map(item => item.productId); // Extract product IDs from the wishlist

      // Send the wishlist array to the backend
      const response = await axiosInstance.post(
        `/wishlist/wishlist-to-cart`,
        {wishlistIds}, // Send wishlist array
        {
          params: {token},
        },
      );

      dispatch(updateCart(response.data.cart)); 
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);




export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // get wishlist
      .addCase(getwishlist.pending, state => {
        state.getWishlistLoading = true;
      })
      .addCase(getwishlist.fulfilled, (state, action) => {
        state.getWishlistLoading = false;
        state.wishlist = action.payload.wishlist;
        // console.log(action.payload);
      })
      .addCase(getwishlist.rejected, (state, action) => {
        state.getWishlistLoading = false;
        console.log(action.payload);
      })

      // post wishlist
      .addCase(postWishlist.pending, state => {
        state.postWishlistLoading = true;
      })
      .addCase(postWishlist.fulfilled, (state, action) => {
        state.postWishlistLoading = false;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(postWishlist.rejected, (state, action) => {
        state.postWishlistLoading = false;
        console.log(action.payload);
      })

      // delete wishlist
      .addCase(removeWishlist.pending, state => {
        state.deleteWishlistLoading = true;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.deleteWishlistLoading = false;
        console.log(action.payload);
        state.wishlist = action.payload.wishlist;
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.deleteWishlistLoading = false;
        console.log(action.payload);
      })

      //  wishlist all add to cart
      .addCase(addAllToCart.pending, state => {
        state.addAllToCartLoading = true;
      })
      .addCase(addAllToCart.fulfilled, (state, action) => {
        state.addAllToCartLoading = false;
        console.log(action.payload);
        state.wishlist = [];
      })
      .addCase(addAllToCart.rejected, (state, action) => {
        state.addAllToCartLoading = false;
        console.log(action.payload);
      });
  },
});

export const wishlistStates = state => state.wishlistReducer;
export default wishlistSlice.reducer;
