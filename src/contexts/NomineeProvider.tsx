/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useReducer } from "react";
import { NomineeContext } from "./NomineContext";
import { Nominee, NomineeState } from "../types/nomine";
import { nomineeReducer } from "../reducer/NomineReducer";

const initialState: NomineeState = {
  nominees: [],
  isLoading: false,
  error: null,
  searchQuery: "",
};
export const NomineeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(nomineeReducer, initialState);

  // Simulating API calls - replace with actual API calls later
  const addNominee = useCallback(async (nominee: Nominee) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // TODO: Add API call here
      // const response = await api.post('/nominees', nominee);
      dispatch({
        type: "ADD_NOMINEE",
        payload: { ...nominee, id: new Date().getTime().toString() },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to add nominee" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const updateNominee = useCallback(async (nominee: Nominee) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // TODO: Add API call here
      // const response = await api.put(`/nominees/${nominee.id}`, nominee);
      dispatch({ type: "UPDATE_NOMINEE", payload: nominee });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update nominee" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const deleteNominee = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // TODO: Add API call here
      // await api.delete(`/nominees/${id}`);
      dispatch({ type: "DELETE_NOMINEE", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete nominee" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);

  return (
    <NomineeContext.Provider
      value={{
        state,
        dispatch,
        addNominee,
        updateNominee,
        deleteNominee,
        setSearchQuery,
      }}
    >
      {children}
    </NomineeContext.Provider>
  );
};
