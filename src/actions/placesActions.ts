import { Suggest } from "react-geosuggest";

export const ActionTypes = {
  SELECT_SUGGESTION: 'SELECT_SUGGESTION',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
};

export const selectSuggestion = (suggestion: Suggest) => ({
  type: ActionTypes.SELECT_SUGGESTION,
  payload: suggestion,
});

export const addToHistory = (suggestion: Suggest) => ({
  type: ActionTypes.ADD_TO_HISTORY,
  payload: suggestion,
});
export const clearHistory = () => ({
  type: ActionTypes.CLEAR_HISTORY,
});
