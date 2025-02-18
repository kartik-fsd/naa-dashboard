import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export function MobileNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="lg:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="flex justify-between items-center p-2">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="flex space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
