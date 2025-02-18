import { useContext } from "react";
import { DocumentVaultContext } from "../contexts/DocContext";

export const useDocument = () => {
  const context = useContext(DocumentVaultContext);
  if (!context) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};
