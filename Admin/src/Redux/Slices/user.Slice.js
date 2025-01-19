import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  getUsersLoading: false,
  allUsers: [],
  updateUserRoleLoading: false,
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

export const editUserRole = createAsyncThunk(
  "users/editUser",
  async ({userId,role}, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.put(`/user/edit-user-role/${userId}`, {role}, {
        params: { token },
      });
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

    // get all users
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


      // uudate user Role
      .addCase(editUserRole.pending, (state) => {
        state.updateUserRoleLoading = true;
      })
      .addCase(editUserRole.fulfilled, (state, action) => {
        state.updateUserRoleLoading = false;
        state.allUsers = state.allUsers.map(user =>
          user._id === action.payload.user._id ? action.payload.user : user
        );
        toast.success("Role Updated Successfully")
      })
      .addCase(editUserRole.rejected, (state, action) => {
        state.updateUserRoleLoading = false;
        console.log(action.payload);
      })



      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.allUsers = state.allUsers.filter(user => user._id !== action.payload.userId);
        toast.success("User deleted successfully");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserLoading = false;
        console.log(action.payload);
      });
  },
});

export const usersStates = (state) => state.userReducer;
export default userSlice.reducer;
