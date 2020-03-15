import React, { Component } from 'react';
import Products from './Products';
import { listOfDogs } from '../data/data';
import { connect } from 'react-redux';
import { purchase, cleanCart } from '../actions/action';

class Shop extends Component {
  constructor(props) {
    super(props);
    // this.findProductIndex = this.findProductIndex.bind(this);
    // this.updateProductUnits = this.updateProductUnits.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resertCart = this.resertCart.bind(this);
  }

  // findProductIndex(cart, productID) {
  //   return cart.findIndex((p) => p.id === productID);
  // }

  // updateProductUnits(cart, product) {
  //   const productIndex = this.findProductIndex(cart, product.id);

  //   const updatedProducts = [...cart];
  //   const existingProduct = updatedProducts[productIndex];

  //   const updatedUnitsProduct = {
  //     ...existingProduct,
  //     units: existingProduct.units + product.units,
  //   };

  //   updatedProducts[productIndex] = updatedUnitsProduct;

  //   return updatedProducts;
  // }

  handleClick(listOfDogs) {
    
    const { counter, shippingToCart } = this.props;

    //const existingProductIndex = this.findProductIndex(cart, listOfDogs.id);

    const index = listOfDogs.id - 1;

    const copyCounter = counter;

    copyCounter[index] = copyCounter[index] + 1;

    //let copyCartBuy = existingProductIndex >= 0 ? this.updateProductUnits(cart, listOfDogs) : null
    // [...cart, listOfDogs]
    //console.log('o que é isso? ', copyCartBuy);

    shippingToCart({
      cart:  listOfDogs,
      counter: copyCounter,
    });
  }

  resertCart() {
    const { cleaningTheCart  } = this.props;
    cleaningTheCart({
      cart: [],
      counter: Array(5).fill(null),
    });
  }

  render() {
    const { cart, counter } = this.props;
    
    let cont = 0;
    return (
      <div>
        <ol className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
          {cart.map((iten, index) => {
            cont = cont + iten.cart.price * iten.cart.units;
            return (
              <li key={`${iten}${index}`} className="f5 fw4 gray mt0">
                {iten.cart.name} ←→ {iten.cart.units} R${iten.cart.price * iten.cart.units}
              </li>
            );
          })}
        </ol >
        <main className="pa3 pa5-ns flex flex-wrap">
          {listOfDogs.map((dogs) => (
            <Products
              key={dogs.id}
              {...dogs}
              disabled={counter[dogs.id - 1] >= dogs.limit ? true : false}
              onClick={this.handleClick}
            />
          ))}
          <h2>total R$ {cont ? cont : 0}.00</h2>
          <button
            className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn"
            onClick={this.resertCart}>
            Limpar Carrinho
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ reducer: { cart, counter } }) => ({
  cart,
  counter,
});

const mapDispatchToProps = (dispatch) => ({
  shippingToCart: (value) => dispatch(purchase(value)),
  cleaningTheCart: () => dispatch(cleanCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
