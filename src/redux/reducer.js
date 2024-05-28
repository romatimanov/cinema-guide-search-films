// reducer.js
import { combineReducers } from 'redux';
import { SET_ACTIVE_LINK } from './actions';

const initialActiveLink = localStorage.getItem('activeLink') || '/';

const activeLinkReducer = (state = initialActiveLink, action) => {
  switch (action.type) {
    case SET_ACTIVE_LINK:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  activeLink: activeLinkReducer,
});

export default rootReducer;
