import { takeLatest, put } from 'redux-saga/effects';
import { ActionTypes, addToHistory, clearHistory } from '../actions/placesActions';

function* addToHistorySaga(action: any) {
  const suggestion = action.payload;
  yield put(addToHistory(suggestion));
}
function* clearHistorySaga() {
  yield put(clearHistory());
}

export default function* placeSaga() {
  yield takeLatest(ActionTypes.SELECT_SUGGESTION, addToHistorySaga);
  yield takeLatest(ActionTypes.CLEAR_HISTORY, clearHistorySaga);

}
