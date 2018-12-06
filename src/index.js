// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import App from './App';

import store from './store';

import * as serviceWorker from './serviceWorker';

import './index.css';

const dom: React.Element<Provider> = (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.getElementById('root');

if (rootElement) ReactDOM.render(dom, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
