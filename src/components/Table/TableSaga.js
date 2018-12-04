// @flow

import { call, put, all, takeLatest } from 'redux-saga/effects';

import { TABLE_ACTIONS_TYPES }  from './TableActions';
import { TableActions } from './index';

function fetchApi(url) {
    return fetch(url).then(res => res.json());
}

function* fetchDataSaga(action) {
    try {
        const { variable } = action.payload;
        const url = `/data?variable=${variable}`;
        const data = yield call(fetchApi, url);

        console.log(variable, data);

        yield put(TableActions.changeVariableAction(variable));
        yield put(TableActions.dataFetchedAction(data));
    } catch (e) {
        // yield put(TableActions.errorOnFetch);
    }
}

function* fetchColumnsSaga() {
    try {
        const rawColumns = yield call(fetchApi, '/columns');
        const columns = rawColumns.map(rawColumn => rawColumn.Field);

        console.log('columns', columns);

        yield put(TableActions.columnsFetchedAction(columns));
    } catch (e) {
        // yield put(TableActions.errorOnFetch);
    }
}

function* TableSaga() {
    yield all([
        takeLatest(TABLE_ACTIONS_TYPES.fetchColumns, fetchColumnsSaga),
        takeLatest(TABLE_ACTIONS_TYPES.fetchData, fetchDataSaga),
    ]);
}

export default TableSaga;
