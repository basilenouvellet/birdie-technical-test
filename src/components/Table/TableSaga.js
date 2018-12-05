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
    .catch((err) => {
      console.error(err);
      return [];
    });
}

function* fetchDataSaga(action: FetchDataActionType): * {
  const { variable } = action.payload;

  if (variable) {
    const url = `/data?variable=${variable}`;
    const data = yield call(fetchApi, url);

    yield put(TableActions.setDataAction(data));
  }
}

function* fetchColumnsSaga(): * {
  const rawColumns = yield call(fetchApi, '/columns');
  const columns = rawColumns.map(rawColumn => rawColumn.Field);

  yield put(TableActions.setColumnsAction(columns));
}

function* TableSaga(): * {
  yield all([
    takeLatest(types.FETCH_COLUMNS, fetchColumnsSaga),
    takeLatest(types.FETCH_DATA, fetchDataSaga),
  ]);
}

export default TableSaga;
