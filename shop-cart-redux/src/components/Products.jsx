import React from 'react';

const Products = ({id, name, description, img, price, onClick, limit }) => {

  return (
    <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10" id={id}>
      <div className="tc">
        <img src={img} class="br-100 h4 w4 dib ba b--black-05 pa2" title={name} alt={name} />
        <h1 className="f3 mb2">{name}</h1>
        <h2 className="f5 fw4 gray mt0">{description}</h2>

        <button 
        disabled={limit === 0}
        className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn"
        onClick={()=>onClick({id, name, description, img, price, units: 1,})}
        >COMPRAR</button>
        <span>R$ {price}.00</span>
      </div>
    </article>
  );
};

export default Products;