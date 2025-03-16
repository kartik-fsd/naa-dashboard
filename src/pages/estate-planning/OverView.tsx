// src/pages/EstatePlanning/Overview.tsx
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { InfoAlert } from "../../components/etstate-planning/InfoAlert";

const OverviewPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is Estate Planning?
        </h2>
        <p className="text-gray-600 mb-6">
          Estate planning in India is the process of arranging for the
          management and disposal of your assets during your lifetime and after
          death. It involves creating legal documents like Wills, setting up
          trusts, designating nominees for financial assets, and planning for
          succession according to applicable personal laws.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Why Estate Planning is Important in India
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-blue-50 p-4">
            <div className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">
                  Prevent Family Disputes
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Clear estate plans reduce conflicts among family members over
                  asset distribution.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 p-4">
            <div className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">
                  Protect Minor Children
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Appoint guardians and create trusts to secure your children's
                  future.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 p-4">
            <div className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">Legal Compliance</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Ensure asset transfer according to Indian succession laws and
                  tax regulations.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 p-4">
            <div className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">Tax Efficiency</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Minimize tax liabilities on asset transfers through proper
                  planning.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Key Components of Estate Planning in India
        </h3>
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-blue-600">1</span>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Will Creation
              </h4>
              <p className="text-gray-600 mt-1">
                A legally binding document that specifies how your assets should
                be distributed after your death. In India, wills should comply
                with the Indian Succession Act, 1925.
              </p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Navigate to Will Creation")}
                >
                  Learn More About Wills
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-blue-600">2</span>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Nominee Designation
              </h4>
              <p className="text-gray-600 mt-1">
                Appointing nominees for financial assets like bank accounts,
                insurance policies, and investments to facilitate smooth
                transition of these assets.
              </p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Navigate to Nominee Designation")}
                >
                  Manage Nominees
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-blue-600">3</span>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Power of Attorney
              </h4>
              <p className="text-gray-600 mt-1">
                Legal authorization for someone to make decisions on your behalf
                if you become incapacitated. In India, this can be general or
                specific.
              </p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Navigate to Power of Attorney")}
                >
                  Create Power of Attorney
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-sm font-semibold text-blue-600">4</span>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Trusts</h4>
              <p className="text-gray-600 mt-1">
                A legal arrangement to hold and manage assets for beneficiaries,
                particularly useful for minor children or family members with
                special needs.
              </p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Navigate to Trusts")}
                >
                  Explore Trust Creation
                </Button>
              </div>
            </div>
          </div>
        </div>

        <InfoAlert type="legal" title="Important Note on Indian Laws">
          <p>
            Estate planning in India is governed by different personal laws
            based on religion:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Hindu Succession Act for Hindus, Buddhists, Jains, and Sikhs
            </li>
            <li>Muslim Personal Law (Shariat) for Muslims</li>
            <li>Indian Succession Act for Christians and Parsis</li>
          </ul>
          <p className="mt-2">
            It's advisable to consult with a legal expert familiar with the
            specific laws applicable to your situation.
          </p>
        </InfoAlert>

        {/* Next Steps Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Getting Started with Estate Planning
          </h3>
          <Card className="p-6">
            <div className="space-y-4">
              <p className="text-gray-600">
                Begin your estate planning journey with these recommended steps:
              </p>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-gray-600">1</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900">
                    Complete Your Asset Inventory
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Document all your assets including financial accounts,
                    properties, and valuable possessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-gray-600">2</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900">
                    Designate Nominees for Financial Assets
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Update nomination details for your bank accounts, insurance
                    policies, and investments.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-gray-600">3</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900">
                    Create Your Will
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Draft a comprehensive Will that covers all your assets and
                    reflects your wishes.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  isFullWidth
                  onClick={() => console.log("Navigate to Asset Inventory")}
                >
                  Start Asset Inventory
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
