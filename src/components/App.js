import React from 'react';
import ProductList from './ProductList';
import CartList from './CartList';

const App = () => {
  return (
    <>
      <h1 className="ui header" style={{ marginTop: '50px', textAlign: 'center' }}>
        Shopping Cart
      </h1>
      <div className="ui container tablet only computer only grid" style={{ marginTop: '50px' }}>
        <div className="ui row ">
          <div className="column seven wide">
            <ProductList />
          </div>
          <div className="column nine wide">
            <CartList />
          </div>
        </div>
      </div>
      <div className="ui container mobile only grid" style={{ marginTop: '50px' }}>
        <div className="ui row">
          <div className="column sixteen wide">
            <ProductList />
          </div>
          <div className="column sixteen wide" style={{ marginTop: '30px' }}>
            <CartList />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
