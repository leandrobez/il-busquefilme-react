import { CREATE_MOVIE } from '../actions/actionsTypes';
const initialState = {
  payload: {
    movies: []
  }
};
export const createMovie = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MOVIE:
      return {
        ...state,
        payload: action.payload
      };
    default:
      return state;
  }
};
