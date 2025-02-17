import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  banners: [],
  loading: false,
  getBannerLoading: false,
  postBannerLoading: false,
  updataBannerLoading: false,
  deleteBannerLoading: false,
  error: null,
};



// Fetch all banners
export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get("/banner/get", {
        params: { token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);


// Add a new banner
export const addBanner = createAsyncThunk(
  "banner/addBanner",
  async (bannerData, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.post("/banner/post", bannerData, {
        params: { token },
      });
      toast.success("Banner added successfully");
      return response.data
    } catch (err) {
      toast.error("Failed to add banner");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);


// Update a banner
export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.put(
        `/banner/update/${id}`,
        updatedData,
        {
          params: { token },
        }
      );
      toast.success("Banner updated successfully");
      return response.data;
    } catch (err) {
      toast.error("Failed to update banner");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);


// Delete a banner
export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      const token = await getToken();
      await axiosInstance.delete(`/banner/delete/${id}`, {
        params: { token },
      });
      toast.success("Banner deleted successfully");
      return id;
    } catch (err) {
      toast.error("Failed to delete banner");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);


const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.banners.push(action.payload.banner);
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.banners.push(action.payload.banner);
      })

      // updata
      .addCase(updateBanner.pending, (state, action) => {
        state.updataBannerLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.banners = state.banners.map((banner) =>
          banner.id === action.payload.banner.id
            ? action.payload.banner
            : banner
        );
        state.updataBannerLoading = false;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.updataBannerLoading = false;
      })

      // delete
      .addCase(deleteBanner.pending, (state, action) => {
        state.deleteBannerLoading = false;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter(
          (banner) => banner.id !== action.payload
        );
        state.deleteBannerLoading = false;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.banners = state.banners.filter(
          (banner) => banner.id !== action.payload
        );
        state.deleteBannerLoading = false;
      });
  },
});

export const bannerStates = (state) => state.bannerReducer;
export default bannerSlice.reducer;
