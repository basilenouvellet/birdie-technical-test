// @flow

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { TableReducer, TableSaga } from './components/Table';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(
    TableReducer,
    applyMiddleware(sagaMiddleware),
);

// then run the saga
sagaMiddleware.run(TableSaga);

export default store;
