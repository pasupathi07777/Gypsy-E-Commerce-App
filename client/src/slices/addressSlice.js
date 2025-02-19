import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/axios';
import {getToken} from '../utils/tokenFunction';


const initialState = {
  addressLoading: false,
  deleteLoading: false,
  addressError: null,
  userAddress: null,
  currentStatus: null,
};


// Fetch user address
export const getAddress = createAsyncThunk(
  'address/getAddress',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/address/get`, {
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


// Add new address
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (address, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.post(`/address/add`, address, {
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


// Update an existing address
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async (address, {rejectWithValue}) => {
    try {
      const token = await getToken();
      console.log(address, 'update Address');
      const response = await axiosInstance.put(`/address/update`, address, {
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


// delete an existing address
export const deleteUserAddress = createAsyncThunk(
  'address/deleteAddress',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.delete(`/address/delete`, {
        params: {token},
      });
      return response.data;
    } catch (err) {
      console.log(err);
      
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);


// Slice to handle address state
export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.currentStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAddress.pending, state => {
        state.addressLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.userAddress = action.payload.address;
        // console.log(state.userAddress);
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      })
      .addCase(addAddress.pending, state => {
        state.addressLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.userAddress = action.payload.address;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      })
      .addCase(updateAddress.pending, state => {
        state.addressLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.userAddress = action.payload.address;
        state.currentStatus = null;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
        // console.log(action.payload);
      })
      .addCase(deleteUserAddress.pending, state => {
        state.deleteLoading = true;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.userAddress = null;
        // console.log(action.payload);
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.deleteLoading = false;
        // console.log(action.payload);
      });
  },
});
export const {updateStatus} = addressSlice.actions;
export const addressStates = state => state.addressReducer;
export default addressSlice.reducer;
