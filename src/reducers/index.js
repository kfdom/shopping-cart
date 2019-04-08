import { combineReducers } from 'redux';

const productsReducer = () => {
  return [
    { name: 'Sledgehammer', price: 125.76 },
    { name: 'Axe', price: 190.51 },
    { name: 'Bandsaw', price: 562.14 },
    { name: 'Chisel', price: 13.9 },
    { name: 'Hacksaw', price: 19.45 }
  ];
};
const shoppingCartReducer = (selectedProducts = [], action) => {
  //this payload type is for add new product and increase product quantity in the cart
  if (action.type === 'ADD_PRODUCT') {
    if (selectedProducts.some(product => product.name === action.payload.name)) {
      let newSelectedProducts = [];
      selectedProducts.forEach(product => {
        if (product.name === action.payload.name) {
          newSelectedProducts.push({
            name: action.payload.name,
            unitPrice: action.payload.price,
            qty: product.qty + 1
          });
        } else {
          newSelectedProducts.push({
            name: product.name,
            unitPrice: product.unitPrice,
            qty: product.qty
          });
        }
      });

      return newSelectedProducts;
    } else {
      return [
        ...selectedProducts,
        { name: action.payload.name, unitPrice: action.payload.price, qty: 1 }
      ];
    }
  } else if (action.type === 'DELETE_PRODUCT') {
    //this payload type is for delete the whole product from the cart
    return selectedProducts.filter(function(product) {
      return product.name !== action.payload.name;
    });
  } else if (action.type === 'DEC_PRODUCT_QTY') {
    //this payload type is for decrease 1 unit product from the cart
    if (selectedProducts.some(product => product.name === action.payload.name)) {
      let newSelectedProducts = [];
      selectedProducts.forEach(product => {
        if (product.name === action.payload.name) {
          //decrease qty by 1 if qty more than 1, otherwise it will exclude from the new array
          if (product.qty > 1) {
            newSelectedProducts.push({
              name: action.payload.name,
              unitPrice: action.payload.price,
              qty: product.qty - 1
            });
          }
        } else {
          newSelectedProducts.push({
            name: product.name,
            unitPrice: product.unitPrice,
            qty: product.qty
          });
        }
      });

      return newSelectedProducts;
    } else {
      return selectedProducts;
    }
  }

  return selectedProducts;
};

export default combineReducers({
  products: productsReducer,
  cart: shoppingCartReducer
});
