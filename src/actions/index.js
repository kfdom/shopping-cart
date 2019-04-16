export const addProductToCart = product => {
  return {
    type: 'ADD_PRODUCT',
    payload: product
  };
};

export const deleteProductFromCart = product => {
  return {
    type: 'DELETE_PRODUCT',
    payload: product
  };
};

export const decProductQtyInCart = product => {
  return {
    type: 'DEC_PRODUCT_QTY',
    payload: product
  };
};

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART'
  };
};

export const loadCartFromLS = cart => {
  return {
    type: 'GET_CART_FROM_LS',
    payload: cart
  };
};

export const updateCartToLS = cart => {
  return {
    type: 'UPDATE_CART_TO_LS',
    payload: cart
  };
};
