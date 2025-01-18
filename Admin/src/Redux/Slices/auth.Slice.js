import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, setToken } from "../../utils/tokenFunction";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { validateFields } from "../../utils/validationFunction";

const initialState = {
  loginLoading: false,
  otpVerifyLoading: false,
  authLoading:false,
  currentEmail: null,
  logoutLoading: false,
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

export const loginUser = createAsyncThunk(
  "auth/login",
  async (email, { rejectWithValue }) => {
    try {
      console.log("login function", email);

      const error = validateFields({ email });
      if (error) {
        return rejectWithValue({ error });
      }
      const response = await axiosInstance.post(`/auth/login`, { email });
      return email;
    } catch (err) {
      const error = err.response?.data ||
        err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/otp",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const error = validateFields(credentials);
      if (error) {
        return rejectWithValue({ error });
      }
      console.log("Sending credentials:", credentials);

      const response = await axiosInstance.post(
        "/auth/verify-OTP",
        credentials
      );
      console.log("Response:", response.data);

      return response.data;
    } catch (err) {
      console.error("Axios error:", err);

      const error = err.response?.data ||
        err.response || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);
export const getUserAuth = createAsyncThunk(
  "auth/token",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue({ message: "No token found" });
      const response = await axiosInstance.post(`/auth/checkToken`, { token });
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("Token");
      return {};
    } catch (err) {
      return rejectWithValue({ message: "Error during logout" });
    }
  }
);

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (currentUser, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue({ message: "No token found" });
      const response = await axiosInstance.get(
        `/stu-tec/get-stu-tec/${currentUser._id}`
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something wentswrong" };
      return rejectWithValue(error);
    }
  }
);

export const editUserByTeacher = createAsyncThunk(
  "edit/editUserByTeacher",
  async (userData, { rejectWithValue }) => {
    const { username, email } = userData.editDetails;
    const data = userData.editDetails;
    const error = validateFields({ username, email });
    if (error) {
      return rejectWithValue({ error });
    }
    try {
      const response = await axiosInstance.patch(
        `/stu-tec/teacher-update-student/${userData.userId}`,
        data
      );
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something wentswrong" };
      return rejectWithValue(error);
    }
  }
);

export const deleteUserByTeacher = createAsyncThunk(
  "delete/deleteUserByTeacher",
  async (userData, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/stu-tec/teacher-delete-student/${userData._id}`
      );
      return userData;
    } catch (err) {
      const error = err.response?.data || { message: "Something wentswrong" };
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // login api
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload, "logi");
        state.currentEmail = action.payload;
        toast.success(action.payload.message || "Verify Otp");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload);

        toast.error(action.payload.error.message || "Something went wrong");
      })

      // verify otp api
      .addCase(verifyOtp.pending, (state) => {
        state.otpVerifyLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpVerifyLoading = false;
        console.log("otp :", action.payload);
        toast.success( action.payload.message ||"Otp Verify successful.");
        if (action.payload.token) {
          setToken(action.payload.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpVerifyLoading = false;
        console.error("Otp Rejected:", action.payload);
        toast.error(action.payload?.error?.message || "Something went wrong");
      })

      // get user auth for ever route and refress

      .addCase(getUserAuth.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.authLoading = false;
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        console.log(state.currentUser, "state.currentUser");
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.authLoading = false;
        console.log(action.payload, "action.payload");
      })

      .addCase(logout.fulfilled, (state) => {
        state.currentUser = {};
        state.loginStatus = false;
      })

      // get allu  users
      .addCase(getAllUser.pending, (state) => {
        state.getAllUserLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.getAllUserLoading = false;
        state.allStaff = action.payload.users.filter(
          (user) => user.role === "staff"
        );
        state.allStudent = action.payload.users.filter(
          (user) => user.role === "student"
        );
        console.log(state.allUser, "state allusr");
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.getAllUserLoading = false;
        console.log(action.payload, "action.payload");
      })

      // edit student by teacher

      .addCase(editUserByTeacher.pending, (state) => {
        state.editUserLoading = true;
      })
      .addCase(editUserByTeacher.fulfilled, (state, action) => {
        state.editUserLoading = false;
        console.log(action.payload);
        state.editUser = {};
        if (action.payload.user.role === "staff") {
          state.allStaff = state.allStaff.map((user) => {
            if (user._id === action.payload.user._id) {
              return action.payload.user;
            }

            return user;
          });
        }
        if (action.payload.user.role === "student") {
          state.allStudent = state.allStudent.map((user) => {
            if (user._id === action.payload.user._id) {
              return action.payload.user;
            }

            return user;
          });
        }
        Alert.alert("", action.payload.message || "Successfully Updated");
      })
      .addCase(editUserByTeacher.rejected, (state, action) => {
        state.editUserLoading = false;
        console.log(action.payload, "action.payload");
        Alert.alert("", action.payload.error.message || "Something went wrong");
      })

      // delete user by teacher

      .addCase(deleteUserByTeacher.pending, (state) => {
        state.deleteUserLoading = true;
      })
      .addCase(deleteUserByTeacher.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        if (action.payload.role === "student") {
          state.allStudent = state.allStudent.filter(
            (user) => user._id !== action.payload._id
          );
        } else {
          state.allStaff = state.allStaff.filter(
            (user) => user._id !== action.payload._id
          );
        }
        Alert.alert("", action.payload.message || "Successfully Deleted");
        console.log(action.payload);
      })
      .addCase(deleteUserByTeacher.rejected, (state, action) => {
        state.deleteUserLoading = false;
        Alert.alert("", action.payload.error.message || "Something went wrong");
        console.log(action.payload);
      });
  },
});

export const authStates = (state) => state.authReducer;
export const {} = authSlice.actions;
export default authSlice.reducer;
