export const loginStorage = (store) => (next) => (action) => {
  if (action.type === 'USER') {
    localStorage.setItem('rslang-team15-user', JSON.stringify(action.payload));
  }
  return next(action);
}

export const logoutStorage = (store) => (next) => (action) => {
  if (action.type === 'USER_LOGOUT') {
    localStorage.removeItem('rslang-team15-user');
  }
  return next(action);
}
