import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { validateFields } from "../../utils/validationFunction";

const initialState = {
  products: [],
  getProductLoading: false,
  postProductLoading: false,
  updateProductLoading: false,
  deleteProductLoading: false
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
      console.log(data);
      const error = validateFields(data);
      console.log(error);

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



export const updateProduct = createAsyncThunk(
  "update/Product",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const error = validateFields(data);
      console.log(error);

      if (error) {
        return rejectWithValue({ error });
      }

      const token = await getToken();
      const response = await axiosInstance.put(`/product/update/${ data._id }`, data, {
        params: { token},
      });
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);



export const deleteProduct = createAsyncThunk(
  "delete/product",
  async (productId, { rejectWithValue }) => {
    try {

      const token = await getToken();
      const response = await axiosInstance.delete(`/product/delete/${productId}`, {
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
        state.products = action.payload.products;

      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProductLoading = false;
        console.log(action.payload);
        toast.error(action.payload?.error?.message || "Something went wrong");
      })

      // get post product
      .addCase(addProduct.pending, (state) => {
        state.postProductLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.postProductLoading = false;
        state.products = [...state.products, action.payload.product];
        console.log(action.payload);
        toast.success("Add Product Successfullty");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.postProductLoading = false;
        console.log(action.payload);
        toast.error(action.payload?.error?.message || "Something went wrong");
      })

      // get post product
      .addCase(updateProduct.pending, (state) => {
        state.updateProductLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductLoading = false;
        state.products = state.products.map((product) => {
          if (product._id === action.payload.product._id) {
            return action.payload.product;
          }
          return product;
        });
        console.log(action.payload);
        toast.success("update Product Successfullty");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductLoading = false;
        console.log(action.payload);
        toast.error(action.payload?.error?.message || "Something went wrong");
      })

      //delete product
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.product._id
        );
        console.log(action.payload);
        toast.success("Delete Product Successfullty");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        console.log(action.payload);
        toast.error(action.payload?.error?.message || "Something went wrong");
      });
  },
});

export const productStates = (state) => state.productsReducer;
export default productsSlice.reducer;
