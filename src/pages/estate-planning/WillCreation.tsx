// src/pages/EstatePlanning/WillCreation.tsx
import React, { useState } from "react";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  DocumentArrowDownIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useEstatePlanning } from "../../hooks/useEstatePlanning";
import { LoadingSpinner } from "../../components/ui/loadingSpinner";
import { InfoAlert } from "../../components/etstate-planning/InfoAlert";

const WillCreation: React.FC = () => {
  const { isLoading } = useEstatePlanning();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [willStatus, setWillStatus] = useState<
    "not_started" | "in_progress" | "draft" | "completed"
  >("not_started");

  // Simulated will progress for UI demonstration
  const [willProgress, setWillProgress] = useState<number>(0);

  const startWillCreation = () => {
    setWillStatus("in_progress");
    setWillProgress(10);
  };

  const continueWillDraft = () => {
    // In a real app, this would open the will editor or navigate to a different page
    console.log("Continuing with draft will");
  };

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
              Will Creation
            </h2>
            <p className="text-gray-600">
              Create a legally valid will that ensures your assets are
              distributed according to your wishes. Follow the guided process to
              create a comprehensive will document.
            </p>
          </div>

          <div className="flex-shrink-0">
            {willStatus === "not_started" && (
              <Button
                variant="primary"
                size="md"
                icon={<PlusIcon className="w-4 h-4" />}
                iconPosition="left"
                onClick={startWillCreation}
              >
                Start Will Creation
              </Button>
            )}

            {willStatus === "draft" && (
              <Button
                variant="primary"
                size="md"
                icon={<PencilIcon className="w-4 h-4" />}
                iconPosition="left"
                onClick={continueWillDraft}
              >
                Continue Draft
              </Button>
            )}

            {willStatus === "completed" && (
              <Button
                variant="outline"
                size="md"
                icon={<DocumentArrowDownIcon className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => console.log("Download will document")}
              >
                Download Will
              </Button>
            )}
          </div>
        </div>

        {/* Sections Navigation */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveSection("overview")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeSection === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSection("legal_framework")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeSection === "legal_framework"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Legal Framework
          </button>
          <button
            onClick={() => setActiveSection("requirements")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeSection === "requirements"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Requirements
          </button>
          <button
            onClick={() => setActiveSection("tips")}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeSection === "tips"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Tips & Guidelines
          </button>
        </div>

        {/* Content based on active section */}
        {activeSection === "overview" && (
          <div className="space-y-6">
            {/* Will Status Card */}
            <Card hasBorder hasShadow>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Your Will Status
                </h3>

                {willStatus === "not_started" && (
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 rounded-full p-3">
                      <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        No Will Created
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        You haven't created a will yet. Creating a will is an
                        important step in estate planning that ensures your
                        assets are distributed according to your wishes.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={startWillCreation}
                      >
                        Start Will Creation
                      </Button>
                    </div>
                  </div>
                )}

                {willStatus === "in_progress" && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <PencilIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        Will In Progress
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        You've started creating your will. Continue the process
                        to ensure your assets are distributed according to your
                        wishes.
                      </p>

                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">
                            Progress
                          </span>
                          <span className="text-gray-600">{willProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${willProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={continueWillDraft}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {willStatus === "draft" && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Draft Will Available
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        You have a draft will saved. You can continue editing or
                        finalize it when ready.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={continueWillDraft}
                        >
                          Continue Editing
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setWillStatus("completed")}
                        >
                          Finalize Will
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {willStatus === "completed" && (
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Will Completed
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Your will has been completed. Remember to store a
                        physical copy in a safe place and inform your executor
                        about its location.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<DocumentArrowDownIcon className="w-4 h-4" />}
                          iconPosition="left"
                          onClick={() => console.log("Download will document")}
                        >
                          Download Will
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setWillStatus("draft")}
                        >
                          Edit Will
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Key Components of a Will */}
            <Card hasBorder>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Key Components of a Will
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700 font-medium">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Personal Information
                      </h4>
                      <p className="text-sm text-gray-600">
                        Your full legal name, address, and other identifying
                        information to clearly establish the will as yours.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700 font-medium">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Asset Inventory
                      </h4>
                      <p className="text-sm text-gray-600">
                        A comprehensive list of your assets, including property,
                        bank accounts, investments, and personal belongings.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700 font-medium">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Beneficiary Designation
                      </h4>
                      <p className="text-sm text-gray-600">
                        Named individuals or organizations who will receive your
                        assets, with clear instructions for distribution.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700 font-medium">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Executor Appointment
                      </h4>
                      <p className="text-sm text-gray-600">
                        Designation of an executor responsible for carrying out
                        the instructions in your will.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700 font-medium">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Guardian Designation
                      </h4>
                      <p className="text-sm text-gray-600">
                        If you have minor children, name of a guardian who will
                        care for them.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700 font-medium">
                      6
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Signature and Witnesses
                      </h4>
                      <p className="text-sm text-gray-600">
                        Your signature and the signatures of witnesses as
                        required by Indian law for the will to be legally valid.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Will Process Timeline */}
            <Card hasBorder>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Will Creation Process
                </h3>
                <div className="relative">
                  <div className="absolute left-8 top-1 bottom-1 w-0.5 bg-gray-200"></div>

                  <div className="space-y-6">
                    <div className="flex gap-4 relative">
                      <div className="flex-shrink-0 z-10 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="pt-2">
                        <h4 className="font-medium text-gray-900">
                          Gather Information
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Collect personal information, asset details,
                          beneficiary information, and identify potential
                          executors.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 relative">
                      <div className="flex-shrink-0 z-10 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <PencilIcon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="pt-2">
                        <h4 className="font-medium text-gray-900">
                          Draft Will
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Follow the step-by-step guided process to create your
                          will, listing assets and specifying beneficiaries.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 relative">
                      <div className="flex-shrink-0 z-10 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserGroupIcon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="pt-2">
                        <h4 className="font-medium text-gray-900">
                          Witness Signatures
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Sign your will in the presence of two witnesses who
                          also sign the document. Witnesses shouldn't be
                          beneficiaries.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 relative">
                      <div className="flex-shrink-0 z-10 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <DocumentArrowDownIcon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="pt-2">
                        <h4 className="font-medium text-gray-900">
                          Store Safely
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Keep your will in a secure location and inform your
                          executor about its whereabouts. Consider registering
                          it with a sub-registrar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Legal Notice */}
            <InfoAlert type="legal" title="Important Legal Information">
              <p>
                Under the Indian Succession Act, 1925, a will must be signed by
                the testator in the presence of at least two witnesses, who must
                attest the will. The testator must be:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Of sound mind</li>
                <li>Not under coercion or undue influence</li>
                <li>At least 18 years of age (21 for appointed guardians)</li>
              </ul>
              <p className="mt-2">
                While registration of a will is not mandatory in India, it is
                advisable to register it with the sub-registrar to prevent fraud
                and establish authenticity.
              </p>
            </InfoAlert>
          </div>
        )}

        {activeSection === "legal_framework" && (
          <div className="space-y-6">
            <Card hasBorder hasShadow>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Indian Legal Framework for Wills
                </h3>
                <p className="text-gray-600 mb-6">
                  In India, the legal framework for wills varies based on
                  religion and personal laws. Here's an overview of the key
                  legal aspects that govern will creation in India.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Indian Succession Act, 1925
                    </h4>
                    <p className="text-sm text-gray-600">
                      The primary legislation governing wills for Hindus,
                      Buddhists, Sikhs, Jains, and Christians. It defines the
                      legal requirements for a valid will, including provisions
                      for execution, attestation, and revocation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Muslim Personal Law
                    </h4>
                    <p className="text-sm text-gray-600">
                      Sharia law governs succession for Muslims. Under Muslim
                      law, a person can only bequeath up to one-third of their
                      property through a will. The remaining two-thirds is
                      distributed according to Sharia principles.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Hindu Succession Act, 1956
                    </h4>
                    <p className="text-sm text-gray-600">
                      Governs intestate succession (when there's no will) for
                      Hindus. While this doesn't directly relate to wills,
                      understanding it can help in planning your estate
                      distribution.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Registration Act, 1908
                    </h4>
                    <p className="text-sm text-gray-600">
                      Provides for voluntary registration of wills. While
                      registration is not mandatory, it adds to the will's
                      authenticity and makes it less susceptible to challenges.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card hasBorder>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Legal Requirements for a Valid Will
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      1. Testamentary Capacity
                    </h4>
                    <p className="text-sm text-gray-600">
                      The person making the will (testator) must be of sound
                      mind, at least 18 years old, and not under any undue
                      influence, fraud, or coercion.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      2. Proper Execution
                    </h4>
                    <p className="text-sm text-gray-600">
                      The will must be signed by the testator, and the signature
                      must be attested by at least two witnesses who should sign
                      in the presence of the testator.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      3. Clear and Specific Intent
                    </h4>
                    <p className="text-sm text-gray-600">
                      The will should clearly express the testator's intentions
                      regarding the distribution of assets and property.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">4. Witnesses</h4>
                    <p className="text-sm text-gray-600">
                      Witnesses must not be beneficiaries under the will or
                      spouses of beneficiaries, as this can invalidate the
                      bequest to that beneficiary.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <InfoAlert type="legal" title="Recent Legal Precedents">
              <p>
                Recent Indian court judgments have emphasized the importance of
                clear and unambiguous language in wills. In cases of ambiguity,
                courts generally try to ascertain the testator's intent based on
                the overall context of the will.
              </p>
              <p className="mt-2">
                The Supreme Court of India has also upheld that a registered
                will has greater evidentiary value than an unregistered one,
                although registration is not mandatory for validity.
              </p>
            </InfoAlert>
          </div>
        )}

        {activeSection === "requirements" && (
          <div className="space-y-6">
            <Card hasBorder hasShadow>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Documentation Requirements
                </h3>
                <p className="text-gray-600 mb-6">
                  To create a comprehensive and legally valid will, you should
                  have the following information and documents ready:
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Personal Identification
                      </h4>
                      <p className="text-sm text-gray-600">
                        Full legal name, date of birth, address, PAN number,
                        Aadhaar card, and other identification details.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Asset Documentation
                      </h4>
                      <p className="text-sm text-gray-600">
                        Property deeds, bank account statements, investment
                        certificates, insurance policies, vehicle registration
                        documents, and any other proof of ownership.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Beneficiary Information
                      </h4>
                      <p className="text-sm text-gray-600">
                        Full names, addresses, and contact details of all
                        individuals or organizations you wish to include in your
                        will.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Executor Information
                      </h4>
                      <p className="text-sm text-gray-600">
                        Full name, address, and contact details of your chosen
                        executor(s) who will administer your will.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Guardian Information
                      </h4>
                      <p className="text-sm text-gray-600">
                        If you have minor children, details of the person(s) you
                        wish to appoint as their guardian(s).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card hasBorder>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Witness Requirements
                </h3>
                <p className="text-gray-600 mb-4">
                  The witnessing of a will is a critical step in ensuring its
                  validity under Indian law.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Number of Witnesses
                    </h4>
                    <p className="text-sm text-gray-600">
                      A minimum of two witnesses are required under the Indian
                      Succession Act, 1925.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Witness Qualifications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Witnesses must be adults of sound mind who can understand
                      the nature of their role. They should not be beneficiaries
                      under the will or spouses of beneficiaries.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Witnessing Process
                    </h4>
                    <p className="text-sm text-gray-600">
                      The testator must sign or affix their mark in the presence
                      of the witnesses. The witnesses must then attest the will
                      by signing in the presence of the testator. They don't
                      need to sign in each other's presence.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Witness Attestation Clause
                    </h4>
                    <p className="text-sm text-gray-600">
                      It's advisable to include an attestation clause stating
                      that the witnesses saw the testator sign the will and that
                      they signed as witnesses in the testator's presence.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card hasBorder>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Registration and Storage
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Registration Process
                    </h4>
                    <p className="text-sm text-gray-600">
                      While not mandatory, registering your will with the local
                      sub-registrar under the Registration Act, 1908, is
                      advisable. Registration involves:
                    </p>
                    <ul className="list-disc text-sm text-gray-600 pl-5 mt-2 space-y-1">
                      <li>
                        Submission of the will in person to the sub-registrar
                      </li>
                      <li>Payment of the prescribed registration fee</li>
                      <li>Verification of identity and obtaining witnesses</li>
                      <li>
                        Recording the registration in the Register of Wills
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Safe Storage Options
                    </h4>
                    <p className="text-sm text-gray-600">
                      Keep your will in a secure location such as:
                    </p>
                    <ul className="list-disc text-sm text-gray-600 pl-5 mt-2 space-y-1">
                      <li>A bank safe deposit box</li>
                      <li>With your attorney</li>
                      <li>In a fireproof home safe</li>
                      <li>With the registrar's office (if registered)</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                      Inform your executor about the location of your will.
                      Consider making authorized copies for key individuals
                      while keeping the original safe.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <InfoAlert type="warning" title="Important Considerations">
              <p>
                Digital copies of your will are useful for reference, but they
                don't replace the legally binding original document with
                physical signatures. The original document is what the courts
                will recognize.
              </p>
              <p className="mt-2">
                If your assets or family circumstances change significantly,
                consider updating your will. Marriage, divorce, birth of
                children, or substantial changes in assets may necessitate
                revisions.
              </p>
            </InfoAlert>
          </div>
        )}

        {activeSection === "tips" && (
          <div className="space-y-6">
            <Card hasBorder hasShadow>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Best Practices for Creating a Will
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700 font-medium">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Be Clear and Specific
                      </h4>
                      <p className="text-sm text-gray-600">
                        Use clear, unambiguous language to describe your assets
                        and wishes. Be specific about who gets what to avoid
                        confusion or disputes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700 font-medium">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Choose Executors Carefully
                      </h4>
                      <p className="text-sm text-gray-600">
                        Select trustworthy, responsible, and capable individuals
                        as executors. Consider naming alternate executors in
                        case your first choice is unable to serve.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700 font-medium">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Consider All Assets
                      </h4>
                      <p className="text-sm text-gray-600">
                        Include all significant assets in your will, including
                        property, investments, digital assets, heirlooms, and
                        items of sentimental value.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700 font-medium">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Consider Tax Implications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Be aware of potential tax consequences for your
                        beneficiaries. Consult with a tax advisor to structure
                        your will in a tax-efficient manner.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-700 font-medium">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Review and Update Regularly
                      </h4>
                      <p className="text-sm text-gray-600">
                        Review your will periodically, especially after major
                        life events like marriage, divorce, birth of children,
                        or acquisition of significant assets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card hasBorder>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Common Mistakes to Avoid
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Vague Language
                      </h4>
                      <p className="text-sm text-gray-600">
                        Using ambiguous terms can lead to disputes. Be specific
                        about assets and beneficiaries.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Improper Witnessing
                      </h4>
                      <p className="text-sm text-gray-600">
                        Failing to have the will properly witnessed according to
                        legal requirements can invalidate it entirely.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Not Updating the Will
                      </h4>
                      <p className="text-sm text-gray-600">
                        Failing to update your will after significant life
                        changes can result in unintended consequences in asset
                        distribution.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Not Considering Alternate Scenarios
                      </h4>
                      <p className="text-sm text-gray-600">
                        Failing to account for situations where a beneficiary
                        predeceases you or where assets may have been disposed
                        of by the time of your death.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        DIY Without Legal Review
                      </h4>
                      <p className="text-sm text-gray-600">
                        Creating a will without any legal guidance can result in
                        mistakes that may invalidate the will or cause
                        complications for your beneficiaries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card hasBorder>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Special Considerations for Indian Context
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Religion-Specific Succession Laws
                    </h4>
                    <p className="text-sm text-gray-600">
                      In India, succession laws can vary based on religion.
                      Understand the specific provisions that apply to your
                      situation.
                    </p>
                    <ul className="list-disc text-sm text-gray-600 pl-5 mt-2 space-y-1">
                      <li>
                        Hindus, Buddhists, Jains, and Sikhs: Indian Succession
                        Act and Hindu Succession Act
                      </li>
                      <li>
                        Muslims: Sharia Law with limitations on testamentary
                        freedom
                      </li>
                      <li>
                        Christians and Parsis: Indian Succession Act with
                        specific provisions
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Ancestral Property Considerations
                    </h4>
                    <p className="text-sm text-gray-600">
                      For Hindus, ancestral property is subject to specific
                      rules under Hindu law. Be aware of the distinction between
                      self-acquired property and ancestral property.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Agricultural Land
                    </h4>
                    <p className="text-sm text-gray-600">
                      In many states, there are restrictions on the transfer or
                      inheritance of agricultural land. Check state-specific
                      laws that may apply.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Joint Property Ownership
                    </h4>
                    <p className="text-sm text-gray-600">
                      Be clear about jointly owned properties and how they are
                      treated in your will. Certain jointly held properties may
                      not pass through a will automatically.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <InfoAlert type="info" title="Professional Guidance">
              <p>
                While online tools can help create a basic will, consulting with
                a legal professional is recommended, especially if you have
                substantial assets, complex family situations, or specific
                concerns. A lawyer can ensure your will meets all legal
                requirements and truly reflects your intentions.
              </p>
            </InfoAlert>
          </div>
        )}
      </div>
    </div>
  );
};

export default WillCreation;
