// context.tsx
import React, { createContext } from "react";
import { Nominee, NomineeAction, NomineeState } from "../types/nomine";

const initialState: NomineeState = {
  nominees: [],
  isLoading: false,
  error: null,
  searchQuery: "",
};

export const NomineeContext = createContext<{
  state: NomineeState;
  dispatch: React.Dispatch<NomineeAction>;
  addNominee: (nominee: Nominee) => Promise<void>;
  updateNominee: (nominee: Nominee) => Promise<void>;
  deleteNominee: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  addNominee: async () => {},
  updateNominee: async () => {},
  deleteNominee: async () => {},
  setSearchQuery: () => {},
});
