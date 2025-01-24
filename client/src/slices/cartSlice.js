import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getToken} from '../utils/tokenFunction';
import {axiosInstance} from '../utils/axios';

const initialState = {
  cartLoading: false,
  postCartLoading: false,
  removeCartLoading: false,
  cartItems: [],
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/cart/get`, {
        params: {token},
      })
      return response.data
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
)

export const addCartItem = createAsyncThunk(
  'cart/postCartItem',
  async (cartItemId, {rejectWithValue}) => {
    console.log('addCartItem', cartItemId);

    try {
      const token = await getToken();
      const response = await axiosInstance.post(`/cart/add`, cartItemId, {
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

export const removeCart = createAsyncThunk(
  'cart/removeCartItem',
  async (cartItemId, {rejectWithValue}) => {
    console.log('removeCart', cartItemId);
    try {
      const token = await getToken();
      const response = await axiosInstance.delete(
        `/cart/remove/${cartItemId}`,
        {
          params: {token},
        },
      );
      return cartItemId;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // updateCart: (state, action) => {
    //   state.cartItems = action.payload.cartItems;
    // },
  },
  extraReducers: builder => {
    builder
      // get
      .addCase(getCartItems.pending, state => {
        state.cartLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartItems = action.payload.cart;
        console.log(action.payload);
        console.log(state.cartItems);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.cartLoading = false;
        console.log(action.payload);
      })
      // add
      .addCase(addCartItem.pending, state => {
        state.postCartLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.postCartLoading = false;
        state.cartItems = action.payload.cart;
        console.log(action.payload);
        console.log(state.cartItems);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.postCartLoading = false;
        console.log(action.payload);
      })

      // remove
      .addCase(removeCart.pending, state => {
        state.removeCartLoading = true;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.removeCartLoading = false;
        state.cartItems = state.cartItems.filter(
          item => item.productId !== action.payload,
        );
        console.log(action.payload);
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.removeCartLoading = false;
        console.log(action.payload);
      });

  },
});

export const {} = cartSlice.actions;
export const cartStates = state => state.cartReducer;
export default cartSlice.reducer;
