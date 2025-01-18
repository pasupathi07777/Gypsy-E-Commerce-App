// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getToken, setToken } from "../../utils/tokenFunction";
// import { axiosInstance } from "../../utils/axios";
// import toast from "react-hot-toast";
// import { validateFields } from "../../utils/validationFunction";

// const initialState = {
//   getUsersLoading: false,
//   allUsers:[]

// };

// export const getAllUsers = createAsyncThunk(
//     "get/users",
//     async (_, { rejectWithValue }) => {
//       try {
//         const token = await getToken(); 
//         const response = await axiosInstance.get(`/user/get-users`, {
//           params: { token },
//         });
//         console.log(response.data);
        
//         return response.data;
//       } catch (err) {
//         const error = err.response?.data || err.response || { message: "Something went wrong" };
//         return rejectWithValue(error);
//       }
//     }
//   );
  
// export const verifyOtp = createAsyncThunk(
//   "auth/otp",
//   async (credentials, { rejectWithValue, dispatch }) => {
//     try {
//       const error = validateFields(credentials);
//       if (error) {
//         return rejectWithValue({ error });
//       }
//       console.log("Sending credentials:", credentials);

//       const response = await axiosInstance.post(
//         "/auth/verify-OTP",
//         credentials
//       );
//       console.log("Response:", response.data);

//       return response.data;
//     } catch (err) {
//       console.error("Axios error:", err);

//       const error = err.response?.data ||
//         err.response || { message: "Something went wrong" };
//       return rejectWithValue(error);
//     }
//   }
// );




// export const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       .addCase(getAllUsers.pending,(state) => {
//         state.getUsersLoading = true;
//       })
//       .addCase(getAllUsers.fulfilled,(state, action) => {
//         state.getUsersLoading = false;
//         state.allUsers=action.payload.users
//         console.log(action.payload);    

//       })
//       .addCase(getAllUsers.rejected,(state, action) => {
//         state.getUsersLoading = false;
//         console.log(action.payload);

//       })


//   },
// });

// export const usersStates = (state) => state.userReducer;
// export const {} = userSlice.actions;
// export default userSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  getUsersLoading: false,
  allUsers: [],
  updateUserLoading: false,
  deleteUserLoading: false,
};

export const getAllUsers = createAsyncThunk(
  "get/users",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/user/get-users`, {
        params: { token },
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data || err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.put(`/user/edit-user/${userId}`, userData, {
        params: { token },
      });
      toast.success("User updated successfully");
      return response.data;
    } catch (err) {
      const error = err.response?.data || err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.delete(`/user/delete-user/${userId}`, {
        params: { token },
      });
      toast.success("User deleted successfully");
      return response.data;
    } catch (err) {
      const error = err.response?.data || err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.getUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getUsersLoading = false;
        state.allUsers = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.getUsersLoading = false;
        console.log(action.payload);
      })
      .addCase(editUser.pending, (state) => {
        state.updateUserLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        // Update the user in the list
        state.allUsers = state.allUsers.map(user =>
          user._id === action.payload.user._id ? action.payload.user : user
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        console.log(action.payload);
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        // Remove the deleted user from the list
        state.allUsers = state.allUsers.filter(user => user._id !== action.payload.userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserLoading = false;
        console.log(action.payload);
      });
  },
});

export const usersStates = (state) => state.userReducer;
export default userSlice.reducer;
