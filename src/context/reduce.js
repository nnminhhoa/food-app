export const actionType = {
  SET_CARTSHOW: 'SET_CARTSHOW',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_CARTSHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};

export default reducer;
