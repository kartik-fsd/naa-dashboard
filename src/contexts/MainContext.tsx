import { Outlet } from "react-router-dom";

export function MainContent() {
  return (
    <main className="min-h-full">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
}
