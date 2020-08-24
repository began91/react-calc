import React from 'react';
import { Provider } from 'react-redux';
import Calculator from './components/Calculator';
import History from './components/History';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <header className="App-header">
          <h2>
            React Calculator
          </h2>
        </header>
        <section className="calculator">
          <Calculator />
          <History />
        </section>
      </div>
    </Provider>
  );
}

export default App;
