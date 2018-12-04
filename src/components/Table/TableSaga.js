// @flow

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { TABLE_ACTIONS_TYPES }  from './TableActions';
import { TableActions } from './index';

function fetchApi() {
    return fetch('/data').then(res => res.json());
}

function* fetchTest(action) {
    try {
        const data = yield call(fetchApi);

        console.log(action.type, data);

        yield put(TableActions.changeVariableAction(data));
    } catch (e) {
        // yield put(TableActions.errorOnFetch);
    }
}

function* TableSaga() {
    yield takeLatest(TABLE_ACTIONS_TYPES.fetchTest, fetchTest);
}

export default TableSaga;
