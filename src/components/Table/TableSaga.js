// @flow

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { TABLE_ACTIONS_TYPES }  from './TableActions';
import { TableActions } from './index';

function fetchApi(variable) {
    return fetch(`/data?variable=${variable}`).then(res => res.json());
}

function* fetchDataSaga(action) {
    try {
        const { variable } = action.payload;
        const data = yield call(fetchApi, variable);

        console.log(variable, data);

        yield put(TableActions.changeVariableAction(variable));
        yield put(TableActions.dataFetchedAction(data));
    } catch (e) {
        // yield put(TableActions.errorOnFetch);
    }
}

function* TableSaga() {
    yield takeLatest(TABLE_ACTIONS_TYPES.fetchData, fetchDataSaga);
}

export default TableSaga;
