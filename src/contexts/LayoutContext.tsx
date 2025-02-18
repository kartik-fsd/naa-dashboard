import { createContext } from "react";
import { LayoutContextType } from "../types/layout";

export const LayoutContext = createContext<LayoutContextType>({
  sidebarOpen: false,
  toggleSidebar: () => {},
  isMobile: false,
});
