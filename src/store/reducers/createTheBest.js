const initialState = {
  newValue: ''
};
export const createTheBest = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_THEBEST':
      return {
        ...state,
        newValue: action.newValue
      };
    default:
      return state;
  }
};
