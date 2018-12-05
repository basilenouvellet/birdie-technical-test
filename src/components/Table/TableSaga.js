// @flow

import { call, put, all, takeLatest } from 'redux-saga/effects';

import { TABLE_ACTIONS_TYPES } from './TableActions';
import { TableActions } from './index';

function fetchApi(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => {
            console.error(err);
            return [];
        });
}

function* fetchDataSaga(action) {
    const { variable } = action.payload;
    const url = `/data?variable=${variable}`;
    const data = yield call(fetchApi, url);

    yield put(TableActions.setDataAction(data));
}

function* fetchColumnsSaga() {
    const rawColumns = yield call(fetchApi, '/columns');
    const columns = rawColumns.map(rawColumn => rawColumn.Field);

    yield put(TableActions.setColumnsAction(columns));
}

function* TableSaga() {
    yield all([
        takeLatest(TABLE_ACTIONS_TYPES.fetchColumns, fetchColumnsSaga),
        takeLatest(TABLE_ACTIONS_TYPES.fetchData, fetchDataSaga),
    ]);
}

export default TableSaga;
