import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {validateFields} from '../utils/validationFunction';
import {axiosInstance} from '../utils/axios';
import {updateCart} from './cartSlice';
import {getToken} from '../utils/tokenFunction';



export const placeCartProductOrder = createAsyncThunk(
  'order/placeCartProductOrder',
  async (credentials, {rejectWithValue, dispatch}) => {
    const error = validateFields(credentials);
    if (error) {
      return rejectWithValue({error});
    }
    console.log('Sending credentials:', credentials);
    try {
      const token = await getToken();
      const response = await axiosInstance.post(
        '/order/place-cart-order',
        credentials,
        {
          params: {token},
        },
      );
      dispatch(updateCart([]));
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

export const getOurOrder = createAsyncThunk(
  'order/getOurOrder',
  async (credentials, {rejectWithValue, dispatch}) => {
    const error = validateFields(credentials);
    if (error) {
      return rejectWithValue({error});
    }
    console.log('Sending credentials:', credentials);
    try {
      const token = await getToken();
      const response = await axiosInstance.get('/order/user-order', {
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

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId, {rejectWithValue, dispatch}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.patch(
        `/order/order-cancel/${orderId}`,
        {orderId},
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


export const placeDirectOrder = createAsyncThunk(
  'order/placeDirectOrder',
  async (credentials, {rejectWithValue, dispatch}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.post(
        `/order/direct-order`,
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


const initialState = {
  placeCartProductOrderLoading: false,
  getUserOrderLoading: false,
  currentEmail: null,
  userOrders: [],
  cancelOrderLoading: false,
  directOrder:null,
  directOrderLoding:false,
};


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setDirectOrder:(state,action)=>{
      state.directOrder=action.payload
    }
  },
  extraReducers: builder => {
    builder

      .addCase(placeCartProductOrder.pending, state => {
        state.placeCartProductOrderLoading = true;
      })
      .addCase(placeCartProductOrder.fulfilled, (state, action) => {
        state.placeCartProductOrderLoading = false;
        state.userOrders = action.payload.orders;
        console.log('order :', action.payload);
      })
      .addCase(placeCartProductOrder.rejected, (state, action) => {
        state.placeCartProductOrderLoading = false;
        console.error('Otp Rejected:', action.payload);
        Alert.alert(
          'Error',
          action.payload?.error?.message || 'Something went wrong',
        );
      })

      .addCase(getOurOrder.pending, state => {
        state.getUserOrderLoading = true;
      })
      .addCase(getOurOrder.fulfilled, (state, action) => {
        state.getUserOrderLoading = false;
        state.userOrders = action.payload.orders;
        console.log('order :', action.payload);
      })
      .addCase(getOurOrder.rejected, (state, action) => {
        state.getUserOrderLoading = false;
        console.error('Otp Rejected:', action.payload);
        Alert.alert(
          'Error',
          action.payload?.error?.message || 'Something went wrong',
        );
      })

      // cancel order
      .addCase(cancelOrder.pending, state => {
        state.cancelOrderLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderLoading = false;
        state.userOrders = state.userOrders.map(order => {
          if (order._id == action.payload.cancelProduct._id) {
            return {...order, orderStatus: 'Cancelled'};
          }
          return order;
        });
        console.log('cancel order :', action.payload);
        Alert.alert('Success', 'Your order has been cancelled successfully!');
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelOrderLoading = false;
        console.error('cancel order', action.payload);
        Alert.alert(
          'Error',
          action.payload?.error?.message || 'Something went wrong',
        );
      }) 


      // direcvt order
      .addCase(placeDirectOrder.pending, state => {
        state.directOrderLoding = true;
      })
      .addCase(placeDirectOrder.fulfilled, (state, action) => {
        state.directOrderLoding = false;
        state.userOrders = [...state.userOrders, action.payload.order];
        console.log('Placed order :', action.payload);
        Alert.alert('Success', 'Your order has been Placed successfully!');
      })
      .addCase(placeDirectOrder.rejected, (state, action) => {
        state.directOrderLoding = false;
        console.error('cancel order', action.payload);
        Alert.alert(
          'Error',
          action.payload?.error?.message || 'Something went wrong',
        );
      });


  },
});

export const {setDirectOrder} = orderSlice.actions;
export const orderStates = state => state.orderReducer;
export default orderSlice.reducer;
