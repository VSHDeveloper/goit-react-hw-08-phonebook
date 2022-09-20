export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const getAuthName = state => state.auth.user.name;

export const getIsError = state => state.auth.isError;

export const getToken = state => state.auth.token;

export const getIsFetchingCurrentUser = state =>
  state.auth.isFetchingCurrentUser;
