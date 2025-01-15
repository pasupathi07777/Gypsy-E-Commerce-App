import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import backendUrl from '../../api/backendUrl';
import {validateFields} from '../../utils/validationFunction';

const PORT = backendUrl();

export const verfiyEmail = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const errors = validateFields(credentials);
      if (Object.keys(errors).length > 0) {
        return rejectWithValue({errors});
      }
      console.log(credentials);
      const response = await axios.post(
        `${PORT}/api/auth/otpSenter`,
        credentials,
      );
      return response.data;
    } catch (err) {
      console.log(err, 'err');

      const error = err.response?.data || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  Loading: false,
  verfiyEmailForm: {
    email: '',
    errors: {
      email: '',
      other: '',
    },
  },
  currentUser: {},
  verfiyEmail: null,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    updateEmailVerifyForm: (state, action) => {
      const {field, value} = action.payload;
      console.log(field, value);
      state.verfiyEmailForm[field] = value;
      state.verfiyEmailForm.errors[field] = '';
      console.log(state.verfiyEmailForm, 'login form');
    },
    setRestPasswordErrors: (state, action) => {
      console.log('hii ka');

      const {errors} = action.payload;
      console.log(errors);
      if (Array.isArray(errors)) {
        errors.forEach(errorObj => {
          const {field, error} = errorObj;
          if (field && state.verfiyEmailForm.errors.hasOwnProperty(field)) {
            state.verfiyEmailForm.errors[field] = error;
          }
        });
      }
      console.log(state.resetPasswordForm, 'login form errors ');
    },
  },
  extraReducers: builder => {
    builder
      // verfiyEmail
      .addCase(verfiyEmail.pending, state => {
        state.Loading = true;
      })
      .addCase(verfiyEmail.fulfilled, (state, action) => {
        state.Loading = false;
        state.loginForm = initialState.loginForm;
        console.log(action.payload.email);
        state.verfiyEmail = action.payload.email;
        state.verfiyEmail = {
          email: '',
          errors: {
            email: '',
            other: '',
          },
        };
      })
      .addCase(verfiyEmail.rejected, (state, action) => {
        state.Loading = false;
        console.log(action.payload, 'action.payload');
      });
  },
});

export const {updateEmailVerifyForm, setRestPasswordErrors} =
  resetPasswordSlice.actions;
export const verifyEmailState = state => state.verifyEmailReducer;
export default resetPasswordSlice.reducer;
