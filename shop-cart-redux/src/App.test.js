import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { initialState, reducer } from './reducers/reducers';
import App from './App';

const clear = () =>
  afterEach(function() {
    cleanup();
  });

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
describe('Testando o redux', () => {
  clear()
  test('Verificando se renderiza a pagina', () => {
    const { getByText } = renderWithRedux(<App />);
    const results = getByText('total R$ 0.00');
    expect(results).toBeInTheDocument();
  });
  clear()
  test('Se tem alguns cards na tela', () => {
    const { getByText } = renderWithRedux(<App />);
    const results = getByText('Pinscher');
    expect(results).toBeInTheDocument();
  });
  clear()
  test('Se tem 5 cards na tela', () => {
    const { queryAllByTestId  } = renderWithRedux(<App />);
    const results = queryAllByTestId('button-buy');
    expect(results.length).toBe(5);
  });
  clear()
  test('Se comprar 1 dogue alemão', () => {
    const { queryByTestId, getByText } = renderWithRedux(<App />);
    const comprar = queryByTestId('1');
    fireEvent.click(comprar)
    const value = getByText('total R$ 5000.00');
    const results = getByText('Dog Alemão ←→ 1 R$5000');
    expect(results).toBeInTheDocument();
    expect(comprar).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    const resert = getByText('Limpar Carrinho')
    expect(resert).toBeInTheDocument();
    fireEvent.click(resert)
  });
  clear()
  test('Se limpa a tela tela', () => {
    const { queryByTestId, getByText } = renderWithRedux(<App />);
    const comprar = queryByTestId('3');
    fireEvent.click(comprar)
    const value = getByText('total R$ 1500.00');
    const results = getByText('Pinscher ←→ 1 R$1500');
    expect(results).toBeInTheDocument();
    expect(comprar).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    const resert = getByText('Limpar Carrinho')
    expect(resert).toBeInTheDocument();
    fireEvent.click(resert)
    const value2 = getByText('total R$ 0.00');
    expect(results).not.toBeInTheDocument();
    expect(value2).toBeInTheDocument()
  });
});

describe('Testando se botões desabilitarão', () => {
  clear()
  test('Se so dá para comprar somente 10 vira-lata', () => {
    const { queryByTestId } = renderWithRedux(<App />);
    const btn = queryByTestId('5');
    expect(btn.disabled).toBe(false);
    for (let index = 1; index <= 10; index++) {
      fireEvent.click(btn)
    }
    expect(btn.disabled).toBe(true);
  });
})
