import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';
import { StyleSheetManager } from 'styled-components';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
        <App />
      </StyleSheetManager>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
