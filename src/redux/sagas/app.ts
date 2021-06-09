import { all, takeLatest } from 'redux-saga/effects';

import * as types from '../types'

export function* fetchApp(): Generator {

}

export default function* rootSaga() {
    yield all([
        takeLatest(types.APP_FETCH_DATA, fetchApp),
    ]);
}
