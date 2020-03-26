import { CREATE_DETAIL } from '../actions/actionsTypes';
const initialState = {
  payload: {
    movies: []
  }
};
export const createDetail = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DETAIL:
      return {
        ...state,
        payload: action.payload
      };
    default:
      return state;
  }
};
