import { NomineeAction, NomineeState } from "../types/nomine";

export const nomineeReducer = (
  state: NomineeState,
  action: NomineeAction
): NomineeState => {
  switch (action.type) {
    case "ADD_NOMINEE":
      return {
        ...state,
        nominees: [...state.nominees, action.payload],
      };
    case "UPDATE_NOMINEE":
      return {
        ...state,
        nominees: state.nominees.map((nominee) =>
          nominee.id === action.payload.id ? action.payload : nominee
        ),
      };
    case "DELETE_NOMINEE":
      return {
        ...state,
        nominees: state.nominees.filter(
          (nominee) => nominee.id !== action.payload
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_NOMINEES":
      return {
        ...state,
        nominees: action.payload,
      };
    default:
      return state;
  }
};
