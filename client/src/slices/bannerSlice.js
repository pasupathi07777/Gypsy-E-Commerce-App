import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getToken } from '../utils/tokenFunction';
import { axiosInstance } from '../utils/axios';


const initialState = {
  banners: [],
  loading: false,
  getBannerLoading: false,
};

// Fetch all banners
export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get('/banner/get', {
        params: {token},
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  },
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // get
      .addCase(fetchBanners.pending, state => {
        state.getBannerLoading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.getBannerLoading = false;
        state.banners = action.payload.banners;
        // console.log(state.banners);
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.getBannerLoading = false;
      });
  },
});

export const bannerStates = state => state.bannerReducer;
export default bannerSlice.reducer;
