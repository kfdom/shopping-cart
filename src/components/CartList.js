import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addProductToCart,
  deleteProductFromCart,
  decProductQtyInCart,
  emptyCart,
  loadCartFromLS,
  updateCartToLS
} from '../actions';
import { formatMoney } from '../ultilities/ultilities';

class CartList extends Component {
  componentDidMount() {
    this.props.loadCartFromLS(this.props.cart);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.props.updateCartToLS(this.props.cart);
    }
  }

  renderList() {
    if (this.props.cart.length) {
      return this.props.cart.map(product => {
        product.price = product.unitPrice;
        return (
          <tr key={product.name}>
            <td>
              <i
                style={{ cursor: 'pointer' }}
                className="close red icon"
                onClick={() => this.props.deleteProductFromCart(product)}
              />
              {product.name}
            </td>
            <td style={{ textAlign: 'center' }}>
              <i
                style={{ cursor: 'pointer' }}
                className="minus red icon"
                onClick={() => this.props.decProductQtyInCart(product)}
              />
              <span style={{ marginLeft: '20px', marginRight: '20px' }}>{product.qty}</span>
              <i
                style={{ cursor: 'pointer' }}
                className="plus green icon"
                onClick={() => this.props.addProductToCart(product)}
              />
            </td>
            <td style={{ textAlign: 'right' }}>{formatMoney(product.unitPrice)}</td>
            <td style={{ textAlign: 'right' }}>{formatMoney(product.unitPrice * product.qty)}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="4" style={{ textAlign: 'center' }}>
            {' '}
            The Cart is Empty{' '}
          </td>
        </tr>
      );
    }
  }

  render() {
    let totalPrice = 0;
    this.props.cart.forEach(x => {
      totalPrice += x.unitPrice * x.qty;
    });

    return (
      <>
        <h3 className="ui header">Cart</h3>
        <div className="ui segment">
          <table className="ui green table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th style={{ textAlign: 'center' }}>Quantity</th>
                <th style={{ textAlign: 'right' }}>Unit Price</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
              <tr>
                <td>
                  {this.props.cart.length > 0 && (
                    <button className="ui button negative" onClick={() => this.props.emptyCart()}>
                      Remove All
                    </button>
                  )}
                </td>
                <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  Total Price
                </td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {formatMoney(totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};

export default connect(
  mapStateToProps,
  {
    addProductToCart,
    deleteProductFromCart,
    decProductQtyInCart,
    emptyCart,
    loadCartFromLS,
    updateCartToLS
  }
)(CartList);
