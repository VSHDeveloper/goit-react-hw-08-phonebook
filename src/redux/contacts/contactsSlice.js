import { createSlice } from '@reduxjs/toolkit';
import { contactsApi } from 'redux/api';

const initialState = {
  data: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      contactsApi.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
      }
    );
  },
});

// Actions
export const { setFilter } = contactsSlice.actions;

// Reducer
export const contactsReducer = contactsSlice.reducer;
