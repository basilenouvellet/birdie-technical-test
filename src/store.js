// @flow

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { tableReducer, tableSaga } from './components/Table';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
  tableReducer,
  applyMiddleware(sagaMiddleware),
);

// then run the saga
sagaMiddleware.run(tableSaga);

export default store;
