import { useContext } from "react";
import { NomineeContext } from "../contexts/NomineContext";

export const useNominee = () => {
  const context = useContext(NomineeContext);
  if (!context) {
    throw new Error("useNominee must be used within a NomineeProvider");
  }
  return context;
};
