// @flow

import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';

import { types } from './TableActions';
import { TableActions } from './index';
import type { FetchDataActionType } from './index';

function fetchApi(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => ({ response: json }))
    .catch(error => ({ error }));
}

function* fetchDataSaga(action: FetchDataActionType): * {
  const { variable } = action.payload;

  if (variable) {
    const url = `/data?variable=${variable}`;
    const { response, error } = yield call(fetchApi, url);

    if (response) { // success
      yield put(TableActions.setDataAction(response));
    } else { // error
      yield put(TableActions.fetchDataFailedAction(error, variable));
    }
  }
}

function* fetchColumnsSaga(): * {
  const { response, error } = yield call(fetchApi, '/columns');

  if (response && response.length) { // success
    const columns = response.map(rawColumn => rawColumn.Field);
    yield put(TableActions.setColumnsAction(columns));
  } else { // error
    yield put(TableActions.fetchColumnsFailedAction(error));
  }
}

function* TableSaga(): * {
  yield all([
    takeLatest(types.FETCH_COLUMNS, fetchColumnsSaga),
    takeLatest(types.FETCH_DATA, fetchDataSaga),
  ]);
}

export default TableSaga;
