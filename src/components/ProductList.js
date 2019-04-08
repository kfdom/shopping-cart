import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductToCart } from '../actions';

class ProductList extends Component {
  renderList() {
    return this.props.products.map(product => {
      return (
        <div className="item" key={product.name}>
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={() => this.props.addProductToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          <div className="content">{product.name}</div>
          <div className="content">{product.price}</div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { products: state.products };
};

export default connect(
  mapStateToProps,
  { addProductToCart }
)(ProductList);
