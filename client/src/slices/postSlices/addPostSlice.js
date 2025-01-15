// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   mediaList: [],
//   selectedMedia: null,
//   loading: false,
//   loadingThumbnails: {},
//   postCaption: '',
//   postLoading:false
// };


// export const addPost = createAsyncThunk(
//     'update/profilePhoto',
//     async (_) => {
//       try {
//         const response = await axiosInstance.post(`/profile/post`, {
//           profilePic,
//           token: await getToken(),
//         });
//         dispatch(updateCurrentUser(response.data.user));
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(
//           error?.response?.data || error.message || 'Something went wrong',
//         );
//       }
//     },
//   );




// const addPostSlice = createSlice({
//   name: 'post',
//   initialState,
//   reducers: {
//     setMediaList(state, action) {
//       state.mediaList = action.payload;
//     },
//     setSelectedMedia(state, action) {
//       state.selectedMedia = action.payload;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setLoadingThumbnails(state, action) {
//       state.loadingThumbnails = action.payload;
//     },
//     setPostCaption(state, action) {
//       state.postCaption = action.payload;
//     },
//     addMedia(state, action) {
//       state.mediaList.push(...action.payload.newMedia);
//       if (!state.selectedMedia) {
//         state.selectedMedia = action.payload.newMedia[0];
//       }
//     },
//     removeMedia(state, action) {
//       const updatedMediaList = state.mediaList.filter(
//         item => item.uri !== action.payload,
//       );
//       state.mediaList = updatedMediaList;
//       if (state.selectedMedia?.uri === action.payload) {
//         state.selectedMedia = updatedMediaList.length > 0 ? updatedMediaList[0] : null;
//       }
//     },
//   },
// });

// export const {
//   setMediaList,
//   setSelectedMedia,
//   setLoading,
//   setLoadingThumbnails,
//   setPostCaption,
//   addMedia,
//   removeMedia,
// } = addPostSlice.actions;

// export const addPostState = state => state.addPostReducer;

// export default addPostSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../utils/auth'; // Your method to get the token
import { axiosInstance } from '../../utils/axios';

const initialState = {
  mediaList: [],
  selectedMedia: null,
  loading: false,
  postLoading: false,
  loadingThumbnails: {},
  postCaption: '',
  error: null,
};

export const addPost = createAsyncThunk(
    'post/addPost', 
    async (postData, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        
        // Append media files to FormData
        postData.mediaList.forEach((media) => {
          const mediaType = media.uri.includes('mp4') ? 'video' : 'image';
  
          // Create a file object for each media item
          const file = new File([media.uri], media.uri.split('/').pop(), {
            type: mediaType === 'video' ? 'video/mp4' : 'image/jpeg', // Adjust type accordingly
          });
  
          // Append media file to FormData
          formData.append('media', file);
        });
  
        // Append caption to FormData
        formData.append('caption', postData.postCaption);
  
        // Append token (if required)
        formData.append('token', await getToken());
  
        const response = await axiosInstance.post('/profile/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads
          },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error?.response?.data || error.message || 'Something went wrong'
        );
      }
    }
  );
  
  

const addPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setMediaList(state, action) {
      state.mediaList = action.payload;
    },
    setSelectedMedia(state, action) {
      state.selectedMedia = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLoadingThumbnails(state, action) {
      state.loadingThumbnails = action.payload;
    },
    setPostCaption(state, action) {
      state.postCaption = action.payload;
    },
    addMedia(state, action) {
      state.mediaList.push(...action.payload.newMedia);
      if (!state.selectedMedia) {
        state.selectedMedia = action.payload.newMedia[0];
      }
    },
    removeMedia(state, action) {
      const updatedMediaList = state.mediaList.filter(
        item => item.uri !== action.payload
      );
      state.mediaList = updatedMediaList;
      if (state.selectedMedia?.uri === action.payload) {
        state.selectedMedia = updatedMediaList.length > 0 ? updatedMediaList[0] : null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.postLoading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postLoading = false;
        // Optionally reset the media list and caption
        state.mediaList = [];
        state.postCaption = '';
        console.log(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.postLoading = false;
        state.error = action.payload; // Capture the error
        console.log(action.payload);
        
      });
  },
});

export const {
  setMediaList,
  setSelectedMedia,
  setLoading,
  setLoadingThumbnails,
  setPostCaption,
  addMedia,
  removeMedia,
} = addPostSlice.actions;

export const addPostState = (state) => state.addPostReducer;

export default addPostSlice.reducer;
