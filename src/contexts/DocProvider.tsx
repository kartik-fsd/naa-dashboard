/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useReducer } from "react";
import { DocumentVaultContext, documentVaultReducer } from "./DocContext";
import {
  DocumentVaultState,
  VaultDocument,
  VaultFolder,
} from "../types/documents";

const initialState: DocumentVaultState = {
  documents: [],
  folders: [{ id: "root", name: "All Documents", children: [] }],
  selectedFolderId: "root",
  searchTerm: "",
  isLoading: false,
  error: null,
};
export const DocumentVaultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(documentVaultReducer, initialState);

  const uploadDocuments = useCallback(
    async (files: FileList) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const newDocs: VaultDocument[] = Array.from(files).map((file) => ({
          id: Math.random().toString(),
          name: file.name,
          type: file.name.split(".").pop() || "",
          size: file.size,
          dateUploaded: new Date().toISOString().split("T")[0],
          ownerDocument: "",
          publicId: Math.random().toString(),
          systemId: Math.random().toString(),
          baseURI: "",
          folderId: state.selectedFolderId,
        }));

        // TODO: Add actual API call here
        // const response = await api.uploadDocuments(files);

        dispatch({ type: "ADD_DOCUMENT", payload: newDocs });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to upload documents" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [state.selectedFolderId]
  );

  const deleteDocument = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // TODO: Add actual API call here
      // await api.deleteDocument(id);
      dispatch({ type: "DELETE_DOCUMENT", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete document" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const createFolder = useCallback(async (name: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const newFolder: VaultFolder = {
        id: Math.random().toString(),
        name,
        children: [],
      };
      // TODO: Add actual API call here
      // const response = await api.createFolder(newFolder);
      dispatch({ type: "ADD_FOLDER", payload: newFolder });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to create folder" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const deleteFolder = useCallback(async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // TODO: Add actual API call here
      // await api.deleteFolder(id);
      dispatch({ type: "DELETE_FOLDER", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to delete folder" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const setSelectedFolder = useCallback((id: string) => {
    dispatch({ type: "SET_SELECTED_FOLDER", payload: id });
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  }, []);

  return (
    <DocumentVaultContext.Provider
      value={{
        state,
        dispatch,
        uploadDocuments,
        deleteDocument,
        createFolder,
        deleteFolder,
        setSelectedFolder,
        setSearchTerm,
      }}
    >
      {children}
    </DocumentVaultContext.Provider>
  );
};
