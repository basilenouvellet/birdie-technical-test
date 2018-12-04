// @flow

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { TABLE_ACTIONS_TYPES }  from './TableActions';
import { TableActions } from './index';

function fetchApi() {
    return fetch('/');
}

function* fetchTest(action) {
    try {
        const res = yield call(fetchApi);

        console.log(res);

        yield put(TableActions.changeVariableAction(res));
    } catch (e) {
        // yield put(TableActions.errorOnFetch);
    }
}

function* TableSaga() {
    yield takeLatest(TABLE_ACTIONS_TYPES.fetchTest, fetchTest);
}

export default TableSaga;
