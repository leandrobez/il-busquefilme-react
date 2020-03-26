const initialState = {
  newValue: ''
};
export const createChoice = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CHOICE':
      return {
        ...state,
        newValue: action.newValue
      };
    default:
      return state;
  }
};
