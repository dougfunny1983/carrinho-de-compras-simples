import React, { Component } from 'react';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSelect: 0,
    };
    this.creatOptions = this.creatOptions.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.setState({ valueSelect: Number(event.target.value) });
  }

  creatOptions(value) {
    const { valueSelect } = this.state;
    return (
      <select name="quantit" value={valueSelect} onChange={this.handleSelect}>
        {<option value="0">0</option>}
        {value.map((opt, index) => {
          return <option value={index + 1}>{index + 1}</option>;
        })}
      </select>
    );
  }

  render() {
    const { id, name, description, img, price, onClick, limit } = this.props;
    const { valueSelect } = this.state;

    const list = Array(limit).fill(null);

    return (
      <article
        className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10"
        id={id}>
        <div className="tc">
          <img
            src={img}
            className="br-100 h4 w4 dib ba b--black-05 pa2"
            title={name}
            alt={name}
          />
          <h1 className="f3 mb2">{name}</h1>
          <h2 className="f5 fw4 gray mt0">{description}</h2>

          <span>R$ {price}.00</span>
          {this.creatOptions(list)}
          <button
            // disabled={limit === 0}
            className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn"
            onClick={() =>
              onClick({
                id,
                name,
                description,
                img,
                price,
                units: 1,
                valueSelect,
              })
            }>
            COMPRAR
          </button>
        </div>
      </article>
    );
  }
}
