import React from 'react';
import { Provider } from 'react-redux';
import Calculator from './components/Calculator';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <header className="App-header">
          React Calculator
        </header>
        <Calculator />
      </div>
    </Provider>
  );
}

export default App;
