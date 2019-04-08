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
  let newCartProdcts = [];

  //Prevent Price hack by altering local Storage
  if (selectedProducts.length === 0) {
    if (localStorage.getItem('cart-products')) {
      selectedProducts = JSON.parse(localStorage.getItem('cart-products'));

      let productPrice;

      selectedProducts.forEach((product, index) => {
        productPrice = productsReducer().find(x => x.name === product.name).price;
        selectedProducts[index].unitPrice = productPrice;
      });
    }
  }

  if (action.type === 'ADD_PRODUCT') {
    //this payload type is for add new product and increase product quantity in the cart
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
      newCartProdcts = newSelectedProducts;
    } else {
      newCartProdcts = [
        ...selectedProducts,
        { name: action.payload.name, unitPrice: action.payload.price, qty: 1 }
      ];
    }
  } else if (action.type === 'DELETE_PRODUCT') {
    //this payload type is for delete the whole product from the cart
    newCartProdcts = selectedProducts.filter(function(product) {
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

      newCartProdcts = newSelectedProducts;
    } else {
      newCartProdcts = selectedProducts;
    }
  } else if (action.type === 'EMPTY_CART') {
    //this payload type is to empty the cart
    newCartProdcts = [];
  } else {
    newCartProdcts = selectedProducts;
  }
  localStorage.setItem('cart-products', JSON.stringify(newCartProdcts));
  return newCartProdcts;
};

export default combineReducers({
  products: productsReducer,
  cart: shoppingCartReducer
});
