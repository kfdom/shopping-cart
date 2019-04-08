import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductToCart } from '../actions';
import { formatMoney } from '../ultilities/ultilities';

class ProductList extends Component {
  renderList() {
    return this.props.products.map(product => {
      return (
        <tr key={product.name}>
          <td>{product.name}</td>
          <td>{formatMoney(product.price)}</td>
          <td>
            {' '}
            <button
              className="ui button primary"
              onClick={() => this.props.addProductToCart(product)}
            >
              Add to Cart
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <>
        <h3 className="ui header">Product</h3>
        <div className="ui segment">
          <table className="ui red table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Add to Cart</th>
              </tr>
            </thead>
            <tbody>{this.renderList()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.products };
};

export default connect(
  mapStateToProps,
  { addProductToCart }
)(ProductList);
