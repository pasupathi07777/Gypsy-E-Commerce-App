import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  products: [],
  getProductLoading: false,
  postProductLoading: false,
  updateProductLoading: false,
};

export const getProduct = createAsyncThunk(
  "add/getproduct",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get(`/product/get`, {
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

export const addProduct = createAsyncThunk(
  "add/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const error = validateFields(data);
      if (error) {
        return rejectWithValue({ error });
      }
      const token = await getToken();
      const response = await axiosInstance.post(`/product/add`, data, {
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

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get all product
      .addCase(getProduct.pending, (state) => {
        state.getProductLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductLoading = false;
        console.log(action.payload);
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProductLoading = false;
        console.log(action.payload);
        toast.error(action.payload?.error?.message || "Something went wrong");
      })

      // gepost product
      .addCase(addProduct.pending, (state) => {
        state.postProductLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.postProductLoading = false;
        console.log(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.postProductLoading = false;
        console.log(action.payload);
      });
  },
});

export const productStates = (state) => state.productsReducer;
export default productsSlice.reducer;
