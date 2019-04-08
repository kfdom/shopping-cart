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
