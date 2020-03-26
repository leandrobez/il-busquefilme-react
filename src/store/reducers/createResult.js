const initialState = {
  newValue: ''
};
export const createResult = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_RESULT':
      return {
        ...state,
        newValue: action.newValue
      };
    default:
      return state;
  }
};
