import React, { createContext } from "react";
import { DocumentVaultAction, DocumentVaultState } from "../types/documents";

const initialState: DocumentVaultState = {
  documents: [],
  folders: [{ id: "root", name: "All Documents", children: [] }],
  selectedFolderId: "root",
  searchTerm: "",
  isLoading: false,
  error: null,
};

export const DocumentVaultContext = createContext<{
  state: DocumentVaultState;
  dispatch: React.Dispatch<DocumentVaultAction>;
  uploadDocuments: (files: FileList) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  createFolder: (name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  setSelectedFolder: (id: string) => void;
  setSearchTerm: (term: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  uploadDocuments: async () => {},
  deleteDocument: async () => {},
  createFolder: async () => {},
  deleteFolder: async () => {},
  setSelectedFolder: () => {},
  setSearchTerm: () => {},
});

export const documentVaultReducer = (
  state: DocumentVaultState,
  action: DocumentVaultAction
): DocumentVaultState => {
  switch (action.type) {
    case "ADD_DOCUMENT":
      return {
        ...state,
        documents: Array.isArray(action.payload)
          ? [...state.documents, ...action.payload]
          : [...state.documents, action.payload],
      };
    case "DELETE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.filter((doc) => doc.id !== action.payload),
      };
    case "ADD_FOLDER":
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== action.payload),
      };
    case "MOVE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.documentId
            ? { ...doc, folderId: action.payload.newFolderId }
            : doc
        ),
      };
    case "SET_SELECTED_FOLDER":
      return {
        ...state,
        selectedFolderId: action.payload,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
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
    default:
      return state;
  }
};
