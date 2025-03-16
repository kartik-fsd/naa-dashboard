import { useState } from "react";
import {
  BriefcaseIcon,
  PlusIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useLinkedAssets } from "../../hooks/useLinkedAssets";
import { useAssetNominees } from "../../hooks/useAssetNominees";
import { mockAssets } from "../../lib/assetsMockup";
import { Link } from "react-router-dom";
import { useNominee } from "../../hooks/useNomine";
import AssignNomineeModal from "../../components/asset-nominee/AssignNomineeModal";
import NomineeVerificationSimulator from "../../components/asset-nominee/NomineeVerificationSimulator";
import { Asset } from "../../types/assets";

const AssetManagementPage = () => {
  const { linkedAssets, availableAssets, removeLinked } =
    useLinkedAssets(mockAssets);
  const {
    assetNominees,
    assignNomineeToAsset,
    removeNomineeFromAsset,
    getNomineeForAsset,
    getNomineeStatusForAsset,
  } = useAssetNominees();
  const {
    state: { nominees },
  } = useNominee();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showVerificationSimulator, setShowVerificationSimulator] =
    useState(false);

  // Get the actual linked asset objects
  const linkedAssetObjects = mockAssets.filter((asset) =>
    linkedAssets.includes(asset.id)
  );

  // Filter assets based on search term
  const filteredAssets = linkedAssetObjects.filter(
    (asset) =>
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.institution &&
        asset.institution.toLowerCase().includes(searchTerm.toLowerCase())) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler to unlink an asset
  const handleUnlink = (assetId: string) => {
    if (
      window.confirm(
        "Are you sure you want to unlink this asset? This will remove it from your portfolio."
      )
    ) {
      // Check if this asset has a nominee assigned
      const nomineeMapping = getNomineeForAsset(assetId);
      if (nomineeMapping) {
        // Also remove the nominee assignment
        removeNomineeFromAsset(assetId, nomineeMapping.nomineeId);
      }
      removeLinked(assetId);
    }
  };

  // Handler to open nominee assignment modal
  const handleOpenAssignModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowAssignModal(true);
  };

  // Handler to assign a nominee to an asset
  const handleAssignNominee = (assetId: string, nomineeId: string) => {
    assignNomineeToAsset(assetId, nomineeId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <BriefcaseIcon className="h-7 w-7" />
              Asset Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your linked financial accounts and assign nominees
            </p>
          </div>
          <Link
            to="/link-assets"
            className="inline-flex items-center px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Link New Asset
          </Link>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-slate-600">Total Assets</p>
          <p className="text-2xl font-semibold text-slate-900">
            {linkedAssetObjects.length}
          </p>
          <p className="text-sm text-slate-500 mt-1">Linked accounts</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-slate-600">Nominee Status</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-semibold text-slate-900">
              {assetNominees.length}
            </p>
            <p className="text-sm text-slate-500">
              /{linkedAssetObjects.length}
            </p>
          </div>
          <p className="text-sm text-slate-500">Assets with nominees</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-slate-600">Available to Link</p>
          <p className="text-2xl font-semibold text-slate-900">
            {availableAssets.length}
          </p>
          <p className="text-sm text-slate-500 mt-1">Unlinked assets</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh All
          </button>
        </div>
      </div>

      {/* Asset List */}
      {filteredAssets.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Asset
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Institution
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nominee
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => {
                // Get nominee info
                const nomineeMapping = getNomineeForAsset(asset.id);
                const nomineeStatus = getNomineeStatusForAsset(asset.id);
                const nominee = nomineeMapping
                  ? nominees.find((n) => n.id === nomineeMapping.nomineeId)
                  : undefined;

                return (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            asset.category === "stocks"
                              ? "bg-blue-100"
                              : asset.category === "funds"
                              ? "bg-purple-100"
                              : asset.category === "retirement"
                              ? "bg-green-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <span
                            className={`text-lg font-medium ${
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
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {asset.title}
                          </div>
                          {asset.metadata?.accountNumber && (
                            <div className="text-sm text-gray-500">
                              {asset.metadata.accountNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          asset.category === "stocks"
                            ? "bg-blue-100 text-blue-800"
                            : asset.category === "funds"
                            ? "bg-purple-100 text-purple-800"
                            : asset.category === "retirement"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {asset.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.institution || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          asset.status === "linked"
                            ? "bg-green-100 text-green-800"
                            : asset.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {nominee ? (
                        <div
                          className={`flex items-center ${
                            nomineeStatus === "error"
                              ? "text-red-600"
                              : nomineeStatus === "pending"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {nomineeStatus === "error" ? (
                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          ) : (
                            <ShieldCheckIcon className="w-4 h-4 mr-1" />
                          )}
                          <span className="text-xs font-medium">
                            {nominee.fullName}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenAssignModal(asset)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
                        >
                          <UserPlusIcon className="w-3 h-3 mr-1" />
                          Assign Nominee
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.lastUpdated
                        ? new Date(asset.lastUpdated).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => handleOpenAssignModal(asset)}
                          className={`text-slate-400 hover:text-blue-600 ${
                            nominee ? "visible" : "invisible"
                          }`}
                          title={nominee ? "Update nominee" : ""}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleUnlink(asset.id)}
                          className="text-slate-400 hover:text-red-600"
                          title="Unlink asset"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {searchTerm ? (
            <div>
              <p className="text-gray-500 mb-2">No assets match your search</p>
              <p className="text-sm text-gray-400">
                Try using different keywords or filters
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-2">No assets linked yet</p>
              <Link
                to="/link-assets"
                className="inline-flex items-center px-4 py-2 mt-4 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Link Your First Asset
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Nominee Assignment Modal */}
      {selectedAsset && (
        <AssignNomineeModal
          isOpen={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          asset={selectedAsset}
          onAssignNominee={handleAssignNominee}
          currentNomineeId={getNomineeForAsset(selectedAsset.id)?.nomineeId}
          nomineeStatus={getNomineeStatusForAsset(selectedAsset.id)}
          errorDetails={getNomineeForAsset(selectedAsset.id)?.errorDetails}
        />
      )}

      {/* Verification Simulator */}
      <NomineeVerificationSimulator
        isOpen={showVerificationSimulator}
        onClose={() => setShowVerificationSimulator(false)}
      />
    </div>
  );
};

export default AssetManagementPage;
