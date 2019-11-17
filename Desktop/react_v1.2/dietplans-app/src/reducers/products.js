// Products Reducer

const productsReducerDefaultState = [];

export default (state = productsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [
        ...state,
        action.product
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_EXPENSES':
      return action.products;
    default:
      return state;
  }
};
