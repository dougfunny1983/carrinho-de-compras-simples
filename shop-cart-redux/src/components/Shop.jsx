import React, { Component } from 'react';
import Products from './Products';
import { listOfDogs } from '../data/data';

export default class Shop extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
    this.findProductIndex = this.findProductIndex.bind(this);
    this.updateProductUnits = this.updateProductUnits.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resertCart = this.resertCart.bind(this);
  }

  findProductIndex(cart, productID) {
    return cart.findIndex((p) => p.id === productID);
  }

  updateProductUnits(cart, product) {
    const productIndex = this.findProductIndex(cart, product.id);

    const updatedProducts = [...cart];
    const existingProduct = updatedProducts[productIndex];

    const updatedUnitsProduct = {
      ...existingProduct,
      units: existingProduct.units + product.units,
    };

    updatedProducts[productIndex] = updatedUnitsProduct;

    return updatedProducts;
  }

  handleClick(listOfDogs) {
    const { cart } = this.state;
    const existingProductIndex = this.findProductIndex(cart, listOfDogs.id);

    this.setState({
      cart:
        existingProductIndex >= 0
          ? this.updateProductUnits(cart, listOfDogs)
          : [...cart, listOfDogs],
    });
  }

  resertCart() {
    this.setState({
      cart: [],
    });
  }

  render() {
    const { cart } = this.state;
    let cont = 0;
    return (
      <div>
        <ul>
          {cart.map((iten) => {
            cont = cont + iten.price * iten.units;
            console.log(cont);
            return (
              <li>
                {iten.name} ←→ {iten.units} R${iten.price * iten.units}
              </li>
            );
          })}
        </ul>
        <main className="pa3 pa5-ns flex flex-wrap">
          {listOfDogs.map((dogs) => (
            <Products key={dogs.id} {...dogs} onClick={this.handleClick} />
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
