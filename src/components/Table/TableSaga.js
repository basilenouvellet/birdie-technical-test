// @flow

// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// import { TableActions } from './index';

// import Api from '...'

// function* fetchUser(action) {
//     try {
//         const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//     } catch (e) {
//         yield put({type: "USER_FETCH_FAILED", message: e.message});
//     }
// }

function* TableSaga() {
    // yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default TableSaga;
