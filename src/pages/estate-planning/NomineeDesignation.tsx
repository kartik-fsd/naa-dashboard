// src/pages/EstatePlanning/NomineeDesignation.tsx
import React, { useState } from "react";
import {
  UserGroupIcon,
  CheckCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useEstatePlanning } from "../../hooks/useEstatePlanning";
import { LoadingSpinner } from "../../components/ui/loadingSpinner";
import { Asset, Nominee } from "../../types/estate-palnning";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { InfoAlert } from "../../components/etstate-planning/InfoAlert";

const NomineeDesignation: React.FC = () => {
  const { nominees, assets, isLoading } = useEstatePlanning();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"nominees" | "assets">("nominees");

  // Filter nominees based on search query
  const filteredNominees = nominees.filter(
    (nominee) =>
      nominee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nominee.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter assets based on search query
  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group assets by type
  const assetsByType = filteredAssets.reduce((acc, asset) => {
    if (!acc[asset.type]) {
      acc[asset.type] = [];
    }
    acc[asset.type].push(asset);
    return acc;
  }, {} as Record<string, Asset[]>);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Nominee Designation
            </h2>
            <p className="text-gray-600">
              In India, nominating beneficiaries for various assets is a crucial
              part of estate planning. A nominee is a person who is entitled to
              receive the assets of the holder in the event of their death.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              variant="primary"
              size="md"
              icon={<PlusIcon className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => console.log("Add nominee clicked")}
            >
              Add Nominee
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("nominees")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "nominees"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            My Nominees
          </button>
          <button
            onClick={() => setActiveTab("assets")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "assets"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Assets by Nominee
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={
                activeTab === "nominees"
                  ? "Search nominees..."
                  : "Search assets..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "nominees" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNominees.length > 0 ? (
              filteredNominees.map((nominee) => (
                <NomineeCard
                  key={nominee.id}
                  nominee={nominee}
                  assets={assets}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <UserGroupIcon className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No nominees found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? "Try a different search term"
                    : "Start by adding your first nominee"}
                </p>
                <Button
                  variant="primary"
                  size="md"
                  icon={<PlusIcon className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => console.log("Add nominee clicked")}
                >
                  Add Nominee
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.keys(assetsByType).length > 0 ? (
              Object.entries(assetsByType).map(([type, assetsOfType]) => (
                <div key={type}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                    {type} Assets
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assetsOfType.map((asset) => (
                      <AssetNomineeCard
                        key={asset.id}
                        asset={asset}
                        nominees={nominees}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No assets found
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? "Try a different search term"
                    : "You haven't added any assets yet"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Understanding Nomination in India */}
        <div className="mt-12">
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Understanding Nomination in Indian Context
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    The Role of a Nominee
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Under Indian law, a nominee is considered a trustee or
                    custodian of assets, not the absolute owner. They are
                    expected to distribute the assets to legal heirs according
                    to succession laws or the deceased's Will.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Nominee vs. Legal Heir
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    A nominee is different from a legal heir. While a nominee
                    has the right to receive assets immediately after death,
                    legal heirs have ownership rights. This distinction is
                    important in Indian estate planning.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Recent Legal Updates
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Recent judgments by the Supreme Court of India have
                    clarified that nominees are mere custodians who must
                    eventually transfer assets to legal heirs unless specified
                    otherwise in a Will.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Regulatory Requirements */}
        <div className="mt-6">
          <InfoAlert type="legal" title="Important Regulatory Notes">
            <p>Recent regulatory changes affecting nomination in India:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                SEBI has mandated nomination for all securities/mutual fund
                folios (or explicit opt-out)
              </li>
              <li>
                RBI now encourages digital nomination facilities for bank
                accounts
              </li>
              <li>
                Insurance Regulatory and Development Authority has standardized
                nomination processes
              </li>
            </ul>
            <p className="mt-2">
              Ensure all your financial assets have updated nomination details
              to comply with these regulations.
            </p>
          </InfoAlert>
        </div>
      </div>
    </div>
  );
};

interface NomineeCardProps {
  nominee: Nominee;
  assets: Asset[];
}

const NomineeCard: React.FC<NomineeCardProps> = ({ nominee, assets }) => {
  // Find assets assigned to this nominee
  const assignedAssets = assets.filter((asset) =>
    asset.nominees.some((nom) => nom.id === nominee.id)
  );

  return (
    <Card hasBorder hasShadow isHoverable>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                {nominee.name}
              </h3>
              <p className="text-sm text-gray-500">{nominee.relationship}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log(`Edit nominee ${nominee.id}`)}
          >
            Edit
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          {nominee.contact.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <span>Phone:</span>
              <span className="ml-2 font-medium">{nominee.contact.phone}</span>
            </div>
          )}
          {nominee.contact.email && (
            <div className="flex items-center text-sm text-gray-600">
              <span>Email:</span>
              <span className="ml-2 font-medium">{nominee.contact.email}</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Associated Assets</h4>
          {assignedAssets.length > 0 ? (
            <div className="space-y-2">
              {assignedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between"
                >
                  <div className="text-sm text-gray-600">{asset.name}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {asset.nominees.find((nom) => nom.id === nominee.id)?.share}
                    %
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No assets assigned yet</p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log(`Assign assets to ${nominee.id}`)}
          >
            Assign Assets
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface AssetNomineeCardProps {
  asset: Asset;
  nominees: Nominee[];
}

const AssetNomineeCard: React.FC<AssetNomineeCardProps> = ({
  asset,
  nominees,
}) => {
  // Get nominees for this asset
  const assetNominees = asset.nominees.map((nom) => {
    const nomineeDetails = nominees.find((n) => n.id === nom.id);
    return {
      id: nom.id,
      share: nom.share,
      name: nomineeDetails?.name || "Unknown",
      relationship: nomineeDetails?.relationship || "Unknown",
    };
  });

  const totalAssigned = assetNominees.reduce(
    (total, nom) => total + nom.share,
    0
  );
  const isFullyAssigned = totalAssigned === 100;

  return (
    <Card hasBorder hasShadow>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-medium text-gray-900">{asset.name}</h4>
            <p className="text-sm text-gray-500">
              {asset.details.accountNumber || "No account number"}
            </p>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isFullyAssigned
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {isFullyAssigned ? "100% Assigned" : `${totalAssigned}% Assigned`}
          </div>
        </div>

        <div className="mt-3">
          {assetNominees.length > 0 ? (
            <div className="space-y-2">
              {assetNominees.map((nom) => (
                <div key={nom.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{nom.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({nom.relationship})
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {nom.share}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-500">No nominees assigned</p>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log(`Edit nominees for ${asset.id}`)}
          >
            Edit Nominees
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NomineeDesignation;
