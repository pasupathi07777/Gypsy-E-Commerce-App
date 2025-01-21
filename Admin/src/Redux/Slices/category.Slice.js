import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  getCategoryLoading: false,
  postCategoryLoading: false,
  updateCategoryLoading: false,
  deleteCategoryLoading: false,
  Categorys: [],
};


export const getAllCategory = createAsyncThunk(
  "get/Category",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/Category/get`, {
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



export const postCategory = createAsyncThunk(
  "post/Category",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.post(`/Category/post`, {
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



export const editCategory = createAsyncThunk(
  "edit/Category",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.put(
        `/Category/updata/${userId}`,
        { role },
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



export const deleteCategory = createAsyncThunk(
  "delete/Category",
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.delete(
        `/Category/delete/${userId}`,
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




export const categorySlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all users
      .addCase(getAllCategory.pending, (state) => {
        state.getCategoryLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.getCategoryLoading = false;
        // state.ca = action.payload.users;
        console.log(action.payload);
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.getCategoryLoading = false;
        console.log(action.payload);
      })

      // post
      .addCase(postCategory.pending, (state) => {
        state.postCategoryLoading = true;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.postCategoryLoading = false;
        // state.ca = action.payload.users;
        console.log(action.payload);
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.postCategoryLoading = false;
        console.log(action.payload);
      })

      // uudate user Role
      .addCase(editCategory.pending, (state) => {
        state.updateCategoryLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.updateCategoryLoading = false;
        toast.success("Role Updated Successfully");
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.updateCategoryLoading = false;
        console.log(action.payload);
      })

      // delete user
      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategoryLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteCategoryLoading = false;
        // state.allUsers = state.allUsers.filter(
        //   (user) => user._id !== action.payload.userId
        // );
        toast.success("User deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteCategoryLoading = false;
        console.log(action.payload);
      });
  },
});

export const {} = categorySlice.actions;
export const categoryStates = (state) => state.categoryReducer;
export default categorySlice.reducer;
