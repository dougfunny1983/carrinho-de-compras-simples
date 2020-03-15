import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Shop from './components/Shop';
import './style.css';

const componentMajor = () => (
  <div className="App">
    <header className="App-header">
      <Shop />
    </header>
  </div>
);

export default class App extends Component {
  render() {
    return <Provider store={store}>{componentMajor()}</Provider>;
  }
}
