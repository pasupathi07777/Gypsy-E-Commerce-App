import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  getCategoryLoading: false,
  postCategoryLoading: false,
  updateCategoryLoading: false,
  deleteCategoryLoading: false,
  categories: [],
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

export const addCategory = createAsyncThunk(
  "post/Category",
  async (category, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.post(`/category/add`, category, {
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
  async ({ userId, category }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.put(
        `/category/update/${userId}`,{category:category.name}
        ,
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
        state.categories = action.payload.categories;
        console.log(action.payload);
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.getCategoryLoading = false;
        console.log(action.payload);
      })

      // post
      .addCase(addCategory.pending, (state) => {
        state.postCategoryLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.postCategoryLoading = false;
        state.categories = [...state.categories,action.payload.category];
        console.log(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.postCategoryLoading = false;
        console.log(action.payload);
       
      })

      // uudate user Role
      .addCase(editCategory.pending, (state) => {
        state.updateCategoryLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.updateCategoryLoading = false;
        state.categories = state.categories.map((category) => {  
          if (category._id === action.payload.category._id) {
            return action.payload.category;
          }
          return category;
        });
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
state.categories = state.categories.filter((category) => category._id !== action.payload.category._id); 
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
