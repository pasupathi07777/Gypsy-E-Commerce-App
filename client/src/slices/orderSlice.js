import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {validateFields} from '../utils/validationFunction';
import {axiosInstance} from '../utils/axios';
import { getToken } from '../utils/tokenFunction';
import { updateCart } from './cartSlice';





export const placeCartProductOrder = createAsyncThunk(
  'order/placeCartProductOrder',
  async (credentials, {rejectWithValue,dispatch}) => {
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


export const getOurOrder = createAsyncThunk('order/getOurOrder',
  async (credentials, {rejectWithValue, dispatch}) => {
    const error = validateFields(credentials);
    if (error) {
      return rejectWithValue({error});
    }
    console.log('Sending credentials:', credentials);
    try {
      const token = await getToken();
      const response = await axiosInstance.get(
        '/order/user-order',
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
  getUserOrderLoading:false,
  currentEmail: null,
  userOrders:[]
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(placeCartProductOrder.pending, state => {
        state.placeCartProductOrderLoading = true;
      })
      .addCase(placeCartProductOrder.fulfilled, (state, action) => {
        state.placeCartProductOrderLoading = false;
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

        console.log('order :', action.payload);
      })
      .addCase(getOurOrder.rejected, (state, action) => {
        state.getUserOrderLoading = false;
        console.error('Otp Rejected:', action.payload);
        Alert.alert(
          'Error',
          action.payload?.error?.message || 'Something went wrong',
        );
      });
  },
});

export const {} = orderSlice.actions;
export const orderStates = state => state.orderReducer;
export default orderSlice.reducer;
