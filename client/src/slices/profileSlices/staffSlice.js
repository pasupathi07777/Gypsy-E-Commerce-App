// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import backendUrl from '../../api/backendUrl';
// import {axiosInstance} from '../../utils/axios';

// const PORT = backendUrl();
// export const addStaff = createAsyncThunk(
//   'add/addStaf',
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(
//         `${PORT}/add-staff`,
//         credentials,
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(            
//         error?.response?.data || error.message || 'Something went wrong',
//       );
//     }
//   },
// );

// // OTP Slice
// export const stafSlice = createSlice({
//   name: 'staff',
//   initialState: {
//     studentsLoading: false,
//     students: [],
//   },
//   reducers: {
//     setEdiProfile: state => {
//       state.editProfile = !state.editProfile;
//     },
    
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(addStaff.pending, state => {
//         state.studentsLoading = true;
//       })
//       .addCase(addStaff.fulfilled, (state, action) => {
//         state.studentsLoading = false;
//         state.students=[...state.students,action.payload.students]
//         console.log(action.payload);
//       })
//       .addCase(addStaff.rejected, (state, action) => {
//         state.studentsLoading = false;
//       });
//   },
// });

// export const {setEdiProfile} = stafSlice.actions;
// export const staffState = state => state.staffReducer;
// export default stafSlice.reducer;
