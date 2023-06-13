import { Suggest } from 'react-geosuggest';
import { ActionTypes } from '../actions/placesActions';
const initialState = {
  selectedSuggestion: null,
  history: [],
};
export interface PlaceState {
  selectedSuggestion: Suggest | null;
  history: Suggest[];
}
const placeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SELECT_SUGGESTION:
      return {
        ...state,
        selectedSuggestion: action.payload,
      };
    case ActionTypes.ADD_TO_HISTORY:
      return action.payload === null ? state : {
        ...state,
        history: [action.payload, ...state.history],
      };
    case ActionTypes.CLEAR_HISTORY:
      return {
        ...state,
        history: [],
        selectedSuggestion: null
      };
    default:
      return state;
  }
};
export default placeReducer;
