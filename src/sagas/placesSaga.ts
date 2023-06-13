import { takeLatest, put } from 'redux-saga/effects';
import { ActionTypes, addToHistory } from '../actions/placesActions';

function* addToHistorySaga(action: any) {
  const suggestion = action.payload;
  yield put(addToHistory(suggestion));
}
export default function* placeSaga() {
  yield takeLatest(ActionTypes.SELECT_SUGGESTION, addToHistorySaga);
}
