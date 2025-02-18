import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthProvider";
import { NomineeProvider } from "./contexts/NomineeProvider";
import { DocumentVaultProvider } from "./contexts/DocProvider";

export default function App() {
  return (
    <AuthProvider>
      <NomineeProvider>
        <DocumentVaultProvider>
          <RouterProvider router={router} />
        </DocumentVaultProvider>
      </NomineeProvider>
    </AuthProvider>
  );
}
