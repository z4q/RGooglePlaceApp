import { createStore, applyMiddleware, combineReducers, Store, AnyAction } from 'redux';
import createSagaMiddleware from 'redux-saga';
import placeReducer, { PlaceState } from './reducers/placesReducer';
import placeSaga from './sagas/placesSaga';

const rootReducer = combineReducers({
  place: placeReducer,
});

export interface RootState {
  place: PlaceState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(placeSaga);

export default store;
