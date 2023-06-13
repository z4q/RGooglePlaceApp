import { all } from 'redux-saga/effects';
import placesSaga from './placesSaga';

export default function* rootSaga() {
  yield all([
    placesSaga(),
  ]);
}
