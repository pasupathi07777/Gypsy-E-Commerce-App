import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getToken} from '../utils/tokenFunction';
import {axiosInstance} from '../utils/axios';


const initialState = {
  cartLoading: false,
  postCartLoading: false,
  removeCartLoading: false,
  updateCartQuantityLoading: false,
  cartItems: [],
  totalCartPrice:""
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/cart/get`, {
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
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);


export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async (data, {rejectWithValue}) => {
    console.log('removeCart', data);
    try {
      const token = await getToken();
           if (data.action === 'decrement' && data.quantity <= 1) {
             return rejectWithValue({
               message: 'Quantity cannot be less than 1',
             });
           }
      const response = await axiosInstance.patch(`/cart/update`,data,{
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   updateCart:(state,action)=>{
    state.cartItems=action.payload
    console.log(state.cartItems);
    
   }
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
         state.totalCartPrice = action.payload.totalCartPrice;
        console.log(action.payload);

      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.cartLoading = false;
        // console.log(action.payload);
      })
      // add
      .addCase(addCartItem.pending, state => {
        state.postCartLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.postCartLoading = false;
        state.cartItems = action.payload.cart;
         state.totalCartPrice = action.payload.totalCartPrice;
        // console.log(action.payload);
        // console.log(state.cartItems);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.postCartLoading = false;
        // console.log(action.payload);
      })

      // remove
      .addCase(removeCart.pending, state => {
        state.removeCartLoading = true;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.removeCartLoading = false;
         state.totalCartPrice = action.payload.totalCartPrice;
         state.cartItems = action.payload.cart;
        console.log(action.payload);
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.removeCartLoading = false;
        // console.log(action.payload);
      })

      // update quantity
      .addCase(updateCartQuantity.pending, state => {
        state.updateCartQuantityLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.updateCartQuantityLoading = false;
        state.cartItems = action.payload.cart;
        // console.log(action.payload);
        state.totalCartPrice = action.payload.totalCartPrice;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.updateCartQuantityLoading = false;
        // console.log(action.payload);
      });

  },
});

export const {updateCart} = cartSlice.actions;
export const cartStates = state => state.cartReducer;
export default cartSlice.reducer;
