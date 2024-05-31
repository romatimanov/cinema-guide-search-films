import { combineReducers } from 'redux';
import {
  SET_ACTIVE_LINK,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './actions';

const initialActiveLink = localStorage.getItem('activeLink') || '/';
const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const activeLinkReducer = (state = initialActiveLink, action) => {
  switch (action.type) {
    case SET_ACTIVE_LINK:
      return action.payload;
    default:
      return state;
  }
};

const favoriteReducer = (state = initialFavorites, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (state.includes(action.payload)) {
        return state;
      } else {
        return [...state, action.payload];
      }
    case REMOVE_FROM_FAVORITES:
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  activeLink: activeLinkReducer,
  favorites: favoriteReducer,
});
