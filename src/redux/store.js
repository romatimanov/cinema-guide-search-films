import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';

const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('activeLink', state.activeLink);
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
