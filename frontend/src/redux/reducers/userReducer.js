import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {


    RegisterRequest: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },





    LoginRequest: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  
   






// /me
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null; // if log out so no user 
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

      //add it otherwise stay err don`t remove err from next state
    clearError: (state) => {
      state.error = null;
    },
       //add it otherwise stay err don`t remove err massage  from next state
    clearMessage: (state) => {
      state.message = null;
    },




  }
);






export const contractReducer = createReducer(
  {},
  {

CONTACT_US_REQUEST: (state) => {
  state.loading = true;
},
CONTACT_US_SUCCESS: (state, action) => {
  state.loading = false;
  state.message = action.payload;
},
CONTACT_US_FAILURE: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},
CLEAR_ERRORS: (state) => {
  state.error = null;
},
CLEAR_MESSAGE: (state) => {
  state.message = null;
},
}
);
