const initialState = {
  newValue: ''
};
export const createGenre = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_GENRE':
      return {
        ...state,
        newValue: action.newValue
      };
    default:
      return state;
  }
};
