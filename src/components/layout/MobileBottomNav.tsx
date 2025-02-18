import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { mainNavItems, moreOptions } from "../../lib/sidebar-data";

const MobileNavigation: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setShowMore(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5 h-16">
          {mainNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 
                       ${
                         location.pathname === item.path
                           ? "text-slate-600"
                           : "text-gray-600"
                       }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setShowMore(true)}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600"
          >
            <EllipsisHorizontalIcon className="h-6 w-6" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* More Options Panel */}
      <AnimatePresence>
        {showMore && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
              onClick={() => setShowMore(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50"
            >
              <div className="p-4">
                {/* Handle */}
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-1.5 rounded-full bg-gray-300" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    More Options
                  </h2>
                  <button
                    onClick={() => setShowMore(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full 
                             hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-3 gap-4 pb-20">
                  {moreOptions.map((option) => (
                    <button
                      key={option.path}
                      onClick={() => handleNavigation(option.path)}
                      className="flex flex-col items-center justify-center p-4 rounded-xl 
                               bg-gray-50 hover:bg-gray-100"
                    >
                      <option.icon className="h-6 w-6 text-gray-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;
