// @flow

import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';

import { types } from './TableActions';
import { TableActions } from './index';
import type { FetchDataActionType } from './index';

function handleErrors(res) {
  if (!res.ok) {
    return res.json().then((jsonErr) => { throw jsonErr; });
  }

  return res;
}

function fetchApi(url) {
  return fetch(url)
    // since fetch will succeed even if http status code is wrong,
    // we need to check the response ourselves
    // fetch will fail only when there is no network connection or access denied
    .then(handleErrors)
    .then(res => res.json())
    .then(json => ({ response: json })) // return an object with response key
    .catch(error => ({ error })); // return an object with error key
}

function* fetchDataSaga(action: FetchDataActionType): * {
  const { variable } = action.payload;

  if (variable) {
    const url = `/database/data?variable=${variable}`;
    const { response, error } = yield call(fetchApi, url); // either response or error is undefined

    if (response) { // success
      yield put(TableActions.setDataAction(response));
    } else { // error
      yield put(TableActions.fetchDataFailedAction(error, variable));
    }
  }
}

function* fetchColumnsSaga(): * {
  const { response, error } = yield call(fetchApi, '/database/columns');

  if (response && response.length) { // success
    const columns = response.map(rawColumn => rawColumn.Field); // take map only columns names
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
