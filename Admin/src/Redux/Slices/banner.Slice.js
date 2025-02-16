import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { validateFields } from "../../utils/validationFunction";


const initialState = {
  getCategoryLoading: false,
  postCategoryLoading: false,
  updateCategoryLoading: false,
  deleteCategoryLoading: false,
  categories: [],
  deleteCategoryLoadingIds: [],
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





export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getAllCategory.pending, (state) => {
        state.getCategoryLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.getCategoryLoading = false;
        state.categories = action.payload.categories;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.getCategoryLoading = false;
        console.log(action.payload);
      })


  },
});

export const {  } = bannerSlice.actions;
export const bannerStates = (state) => state.bannerReducer;
export default bannerSlice.reducer;
