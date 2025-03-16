// src/components/link-assets/LinkedAssets.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useLinkedAssets } from "../../hooks/useLinkedAssets";
import { mockAssets } from "../../lib/assetsMockup";

interface LinkedAssetsProps {
  showManagement?: boolean;
}

const LinkedAssets: React.FC<LinkedAssetsProps> = ({
  showManagement = false,
}) => {
  const { linkedAssets, removeLinked } = useLinkedAssets(mockAssets);

  // Get the actual linked asset objects
  const linkedAssetObjects = mockAssets.filter((asset) =>
    linkedAssets.includes(asset.id)
  );

  // Handler to unlink an asset
  const handleUnlink = (assetId: string) => {
    if (window.confirm("Are you sure you want to unlink this asset?")) {
      removeLinked(assetId);
    }
  };

  if (linkedAssetObjects.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <p className="text-gray-500">No assets linked yet</p>
        <p className="text-sm text-gray-400 mt-2">
          Connect your financial accounts using the Link Assets section
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Linked Assets
      </h3>

      <div className="space-y-3">
        <AnimatePresence>
          {linkedAssetObjects.map((asset) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{
                duration: 0.2,
              }}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    asset.category === "stocks"
                      ? "bg-blue-100"
                      : asset.category === "funds"
                      ? "bg-purple-100"
                      : asset.category === "retirement"
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                >
                  {/* Use the icon from mockAssets if available */}
                  <span
                    className={`text-sm ${
                      asset.category === "stocks"
                        ? "text-blue-600"
                        : asset.category === "funds"
                        ? "text-purple-600"
                        : asset.category === "retirement"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {asset.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{asset.title}</p>
                  <p className="text-xs text-gray-500">
                    {asset.institution || "Connected"}
                    <span className="ml-2 inline-flex items-center">
                      <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-green-600">Verified</span>
                    </span>
                  </p>
                </div>
              </div>

              {showManagement && (
                <button
                  onClick={() => handleUnlink(asset.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  title="Unlink this asset"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LinkedAssets;
