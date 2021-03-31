export const settingsStorage = (store) => (next) => (action) => {
  if (action.type === 'SET_SETTINGS') {
    const settings = store.getState().ebook.settings;
    localStorage.setItem('rslang-team15-settings', JSON.stringify({ ...settings, ...action.payload }));
  }
  return next(action);
}

