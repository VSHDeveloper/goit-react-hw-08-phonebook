import { createSlice } from '@reduxjs/toolkit';
import { authApi } from 'redux/api';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      }
    );

    builder.addMatcher(
      authApi.endpoints.logIn.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logIn.matchRejected,
      (state, { payload }) => {
        if (payload.status === 400) {
          state.isError = true;
        }
      }
    );

    builder.addMatcher(authApi.endpoints.logOut.matchFulfilled, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });

    builder.addMatcher(
      authApi.endpoints.fetchCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
      }
    );
  },
});

// Reducer
export const authReducer = authSlice.reducer;
