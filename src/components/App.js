import React from 'react';
import ProductList from './ProductList';
// import CartList from './CartList';

const App = () => {
  return (
    <div className="ui container grid">
      <div className="ui row">
        <div className="column eight wide">
          <ProductList />
        </div>
        <div className="column eight wide">{/* <CartList /> */}</div>
      </div>
    </div>
  );
};

export default App;
