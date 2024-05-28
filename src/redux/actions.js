// actions.js
export const SET_ACTIVE_LINK = 'SET_ACTIVE_LINK';

export const setActiveLink = (path) => ({
  type: SET_ACTIVE_LINK,
  payload: path,
});
