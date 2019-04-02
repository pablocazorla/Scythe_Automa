import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer.js';
import './css/reset.css';
import './css/font-awesome.min.css';
import './css/index.css';
import App from './app';
import registerServiceWorker from './app/registerServiceWorker';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();