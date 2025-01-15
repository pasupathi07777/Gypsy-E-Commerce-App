import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {validateFields} from '../../utils/validationFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from '../../utils/tokenFunction';
import {axiosInstance} from '../../utils/axios';
import {Alert} from 'react-native';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const error = validateFields(credentials);
      if (error) {
        return rejectWithValue({error});
      }
      const response = await axiosInstance.post(`/auth/login`, credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('Token', response.data.token);
        const token = await AsyncStorage.getItem('Token');
        console.log(`Token: ${token}`);
      }
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

export const getUserAuth = createAsyncThunk(
  'auth/token',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue({message: 'No token found'});
      const response = await axiosInstance.post(`/auth/checkToken`, {token});
      return response.data;
    } catch (err) {
      const error = err.response?.data || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      await AsyncStorage.removeItem('Token');
      return {};
    } catch (err) {
      return rejectWithValue({message: 'Error during logout'});
    }
  },
);

export const getAllUser = createAsyncThunk(
  'user/getAllUser',
  async (currentUser, {rejectWithValue}) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue({message: 'No token found'});
      const response = await axiosInstance.get(
        `/stu-tec/get-stu-tec/${currentUser._id}`,
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data || {message: 'Something wentswrong'};
      return rejectWithValue(error);
    }
  },
);

export const editUserByTeacher = createAsyncThunk(
  'edit/editUserByTeacher',
  async (userData, {rejectWithValue}) => {
    const {username, email} = userData.editDetails;
    const data = userData.editDetails;
    const error = validateFields({username, email});
    if (error) {
      return rejectWithValue({error});
    }
    try {
      const response = await axiosInstance.patch(
        `/stu-tec/teacher-update-student/${userData.userId}`,
        data,
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data || {message: 'Something wentswrong'};
      return rejectWithValue(error);
    }
  },
);

export const deleteUserByTeacher = createAsyncThunk(
  'delete/deleteUserByTeacher',
  async (userData, {rejectWithValue}) => {
    try {


      await axiosInstance.delete(
        `/stu-tec/teacher-delete-student/${userData._id}`
      );
      return userData;
    } catch (err) {
      const error = err.response?.data || {message: 'Something wentswrong'};
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  loginLoading: false,
  currentUser: {},
  loginStatus: false,
  allUser: [],
  allStaff: [],
  allStudent: [],
  getAllUserLoading: false,
  editUser: null,
  editUserLoading: false,
  deleteUserLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.currentUser = {...state.currentUser, ...action.payload};
    },
    setEditUser: (state, action) => {
      state.editUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload, 'logi');
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        Alert.alert('', 'Login successful.');
        console.log(state.currentUser);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        Alert.alert('', action.payload.error.message || 'Something went wrong');
      })

      .addCase(getUserAuth.pending, state => {
        state.loginLoading = true;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        console.log(state.currentUser, 'state.currentUser');
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload, 'action.payload');
      })

      .addCase(logout.fulfilled, state => {
        state.currentUser = {};
        state.loginStatus = false;
      })

      // get allu  users
      .addCase(getAllUser.pending, state => {
        state.getAllUserLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.getAllUserLoading = false;
        state.allStaff = action.payload.users.filter(
          user => user.role === 'staff',
        );
        state.allStudent = action.payload.users.filter(
          user => user.role === 'student',
        );
        console.log(state.allUser, 'state allusr');
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.getAllUserLoading = false;
        console.log(action.payload, 'action.payload');
      })

      // edit student by teacher

      .addCase(editUserByTeacher.pending, state => {
        state.editUserLoading = true;
      })
      .addCase(editUserByTeacher.fulfilled, (state, action) => {
        state.editUserLoading = false;
        console.log(action.payload);
        state.editUser = {};
        if (action.payload.user.role === 'staff') {
          state.allStaff = state.allStaff.map(user => {
            if (user._id === action.payload.user._id) {
              return action.payload.user;
            }

            return user;
          });
        }
        if (action.payload.user.role === 'student') {
          state.allStudent = state.allStudent.map(user => {
            if (user._id === action.payload.user._id) {
              return action.payload.user;
            }

            return user;
          });
        }
        Alert.alert('', action.payload.message || 'Successfully Updated');
      })
      .addCase(editUserByTeacher.rejected, (state, action) => {
        state.editUserLoading = false;
        console.log(action.payload, 'action.payload');
        Alert.alert('', action.payload.error.message || 'Something went wrong');
      })

      // delete user by teacher

      .addCase(deleteUserByTeacher.pending, state => {
        state.deleteUserLoading = true;
      })
      .addCase(deleteUserByTeacher.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        if (action.payload.role === 'student') {
          state.allStudent = state.allStudent.filter(
            user => user._id !== action.payload._id,
          );
        } else {
          state.allStaff = state.allStaff.filter(
            user => user._id !== action.payload._id,
          );
        }
        Alert.alert('', action.payload.message || 'Successfully Deleted');
        console.log(action.payload);
      })
      .addCase(deleteUserByTeacher.rejected, (state, action) => {
        state.deleteUserLoading = false;
        Alert.alert('', action.payload.error.message || 'Something went wrong');
        console.log(action.payload);
      });
  },
});

export const {updateCurrentUser, setEditUser} = loginSlice.actions;
export const loginState = state => state.loginReducer;
export default loginSlice.reducer;
