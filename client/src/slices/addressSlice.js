// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { axiosInstance } from '../utils/axios';
// import { getToken } from '../utils/tokenFunction';


// const initialState = {
//   addressLoading: false,
//   addressError: null,
//   userAddress: {},

// };


// // Fetch user address
// export const getAddress = createAsyncThunk(
//   'address/getAddress',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = await getToken();
//       const response = await axiosInstance.get(`/address/get`, {
//         params: { token },
//       });
//       return response.data;
//     } catch (err) {
//       const error = err.response?.data || err.response || { message: 'Something went wrong' };
//       return rejectWithValue(error);
//     }
//   }
// );

// // Add new address
// export const addAddress = createAsyncThunk(
//   'address/addAddress',
//   async (address, { rejectWithValue }) => {
//     try {
//       console.log(address);
      
//       const token = await getToken();
//       const response = await axiosInstance.post(`/address/add`, address, {
//         params: { token },
//       });
//       return response.data;
//     } catch (err) {
//       const error = err.response?.data || err.response || { message: 'Something went wrong' };
//       return rejectWithValue(error);
//     }
//   }
// );

// // Update an existing address
// export const updateAddress = createAsyncThunk(
//   'address/updateAddress',
//   async (address, { rejectWithValue }) => {
//     try {
//       const token = await getToken();
//       const response = await axiosInstance.patch(`/address/update`, address, {
//         params: { token },
//       });
//       return response.data; // Assuming API returns updated address
//     } catch (err) {
//       const error = err.response?.data || err.response || { message: 'Something went wrong' };
//       return rejectWithValue(error);
//     }
//   }
// );

// // Slice to handle address state
// export const addressSlice = createSlice({
//   name: 'address',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(getAddress.pending, state => {
//         state.addressLoading = true;
//       })
//       .addCase(getAddress.fulfilled, (state, action) => {
//         state.addressLoading = false;
//         state.userAddress = action.payload.address;
//         console.log(action.payload);
//          // Set user address in state
//       })
//       .addCase(getAddress.rejected, (state, action) => {
//         state.addressLoading = false;
//         state.addressError = action.payload; // Set error if the request fails
//         console.log(action.payload);
//       })

//       // add
//       .addCase(addAddress.pending, state => {
//         state.addressLoading = true;
//       })
//       .addCase(addAddress.fulfilled, (state, action) => {
//         state.addressLoading = false;
//         console.log(action.payload);
        
//         state.userAddress = action.payload.address; // Update the address after adding
//       })
//       .addCase(addAddress.rejected, (state, action) => {
//         state.addressLoading = false;
//         console.log(action.payload);// Set error if the request fails
//       })

//       // update
//       .addCase(updateAddress.pending, state => {
//         state.addressLoading = true;
//       })
//       .addCase(updateAddress.fulfilled, (state, action) => {
//         state.addressLoading = false;
//         // Update the address in state when updated successfully
//         state.userAddress = action.payload; // Assuming the API returns the updated address
//       })
//       .addCase(updateAddress.rejected, (state, action) => {
//         state.addressLoading = false;
//         state.addressError = action.payload; // Set error if the request fails
//       });
//   },
// });

// // Selector to get address state from Redux store
// export const addressStates = state => state.addressReducer;

// export default addressSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios';
import { getToken } from '../utils/tokenFunction';

const initialState = {
  addressLoading: false,
  addressError: null,
  userAddress: null,
  currentStatus:null
};

// Fetch user address
export const getAddress = createAsyncThunk(
  'address/getAddress',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/address/get`, {
        params: { token },
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data || err.response || { message: 'Something went wrong' };
      return rejectWithValue(error);
    }
  }
);

// Add new address
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (address, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.post(`/address/add`, address, {
        params: { token },
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data || err.response || { message: 'Something went wrong' };
      return rejectWithValue(error);
    }
  }
);

// Update an existing address
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async (address, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.patch(`/address/update`, address, {
        params: { token },
      });
      return response.data; // Assuming API returns updated address
    } catch (err) {
      const error = err.response?.data || err.response || { message: 'Something went wrong' };
      return rejectWithValue(error);
    }
  }
);

// Slice to handle address state
export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateStatus:(state,action)=>{
      state.currentStatus=action.payload

    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAddress.pending, state => {
        state.addressLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.userAddress = action.payload.address;
        console.log(state.userAddress);
        
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
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });
  },
});
export const {updateStatus}=addressSlice.actions
export const addressStates = state => state.addressReducer;
export default addressSlice.reducer;
