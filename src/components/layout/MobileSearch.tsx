import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function MobileSearchModal() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-transform ${
        isSearchOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Search</h2>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
