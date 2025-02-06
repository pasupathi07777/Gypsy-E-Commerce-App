import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { validateFields } from "../../utils/validationFunction";
import { axiosInstance } from "../../utils/axios";
import { getToken } from "../../utils/tokenFunction";



export const getAllOrders = createAsyncThunk(
  "order/getOurOrder",
  async (credentials, { rejectWithValue, dispatch }) => {
    const error = validateFields(credentials);
    if (error) {
      return rejectWithValue({ error });
    }
    console.log("Sending credentials:", credentials);
    try {
      const token = await getToken();
      const response = await axiosInstance.get("/order/user-order", {
        params: { token },
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.patch(
        `/order/order-cancel/${orderId}`,
        { orderId },
        {
          params: { token },
        }
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);



const initialState = {

  getOrderLoading: false,
  allOrders: [],
  cancelOrderLoading: false,
  cancelOrderIds: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCancelOrderIds: (state, action) => {
      state.cancelOrderIds = [...state.cancelOrderIds, action.payload];
    },
    removeCancelOrderIds: (state, action) => {
      state.cancelOrderIds = state.cancelOrderIds.filter(
        (id) => id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllOrders.pending, (state) => {
        state.getOrderLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.getOrderLoading = false;
        state.allOrders = action.payload.orders;
        console.log("orders all :", action.payload);
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.getOrderLoading = false;
        console.error("Otp Rejected:", action.payload);
        // Alert.alert(
        //   "Error",
        //   action.payload?.error?.message || "Something went wrong"
        // );
      })

      // cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.cancelOrderLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderLoading = false;
        state.userOrders = state.userOrders.map((order) => {
          if (order._id == action.payload.cancelProduct._id) {
            return { ...order, orderStatus: "Cancelled" };
          }
          return order;
        });
        state.cancelOrderIds = state.cancelOrderIds.filter(
          (id) => id !== action.payload.cancelProduct._id
        );
        console.log("cancel order :", action.payload);
        // Alert.alert("Success", "Your order has been cancelled successfully!");
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelOrderLoading = false;
        console.error("cancel order", action.payload);
        // Alert.alert(
        //   "Error",
        //   action.payload?.error?.message || "Something went wrong"
        // );
      });

    
  }
});

export const {  setCancelOrderIds, removeCancelOrderIds } =
  orderSlice.actions;
export const orderStates = (state) => state.orderReducer;
export default orderSlice.reducer;
