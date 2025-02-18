import { useState } from "react";
import { Nominee, NomineeFormInputs } from "../../types/nomine";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ArrowUpTrayIcon,
  CalendarIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { LoadingSpinner } from "../ui/Spinner";

interface NomineeDrawerProps {
  initialData: Nominee | null;
  onClose: () => void;
  onSave: (nominee: Nominee) => void;
  isLoading: boolean;
}

export const NomineeDrawer: React.FC<NomineeDrawerProps> = ({
  initialData,
  onClose,
  onSave,
  isLoading,
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialData?.avatarUrl || null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, touchedFields },
  } = useForm<NomineeFormInputs>({
    defaultValues: {
      fullName: initialData?.fullName || "",
      relationship: initialData?.relationship || "Spouse",
      relationshipOther: initialData?.relationshipOther || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      phoneNumber: initialData?.phoneNumber || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
      identificationType: initialData?.identificationType || "PAN",
      identificationNumber: initialData?.identificationNumber || "",
    },
  });

  const relationship = watch("relationship");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [saveProgress, setSaveProgress] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);

  const simulateSaveProgress = () => {
    setIsSaving(true);
    setSaveProgress(0);
    const interval = setInterval(() => {
      setSaveProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    return () => clearInterval(interval);
  };

  const onSubmit: SubmitHandler<NomineeFormInputs> = async (data) => {
    const cleanup = simulateSaveProgress();

    const nominee: Nominee = {
      id: initialData?.id || "",
      fullName: data.fullName,
      relationship: data.relationship,
      relationshipOther:
        data.relationship === "Other" ? data.relationshipOther : "",
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      identificationType: data.identificationType,
      identificationNumber: data.identificationNumber,
      avatarUrl: avatarPreview || initialData?.avatarUrl,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await onSave(nominee);

    cleanup();
    setIsSaving(false);
    setSaveProgress(0);
  };

  const FormField = ({
    icon: Icon,
    label,
    required = false,
    error,
    touched = false,
    children,
  }: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    required?: boolean;
    error?: string;
    touched?: boolean;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-medium text-slate-700 ">
        <Icon className="w-4 h-4 mr-2 text-slate-500" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {children}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          {error ? (
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
          ) : touched ? (
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          ) : null}
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed right-0 top-16 h-[calc(100%-64px)] w-full md:w-1/2 lg:w-2/5 bg-white shadow-2xl transform transition-transform duration-300">
        <div className="flex justify-between items-center px-6 py-4 border-b bg-slate-50">
          <h2 className="text-xl font-semibold text-slate-900">
            {initialData ? "Edit Nominee" : "Add Nominee"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[calc(100%-64px)] flex flex-col"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex justify-center">
              <div className="text-center">
                <div className="relative inline-block group">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 group-hover:border-slate-200 transition-colors duration-300"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-4 border-slate-100 group-hover:bg-slate-200 transition-colors duration-300">
                      <UserIcon className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-slate-50 transition-colors duration-300">
                    <ArrowUpTrayIcon className="w-4 h-4 text-slate-600" />
                    <input
                      type="file"
                      {...register("avatar")}
                      onChange={handleAvatarChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Click to upload photo
                </p>
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                <h3 className="font-medium text-slate-900 pb-2 border-b border-slate-200">
                  Basic Information
                </h3>

                <FormField
                  icon={UserIcon}
                  label="Full Name"
                  required
                  error={errors.fullName?.message}
                  touched={touchedFields.fullName}
                >
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Full Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className="w-full p-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter full name"
                  />
                </FormField>

                <FormField
                  icon={UsersIcon}
                  label="Relationship"
                  required
                  error={errors.relationship?.message}
                  touched={touchedFields.relationship}
                >
                  <select
                    {...register("relationship", {
                      required: "Relationship is required",
                    })}
                    className="w-full p-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </select>
                </FormField>

                {relationship === "Other" && (
                  <FormField
                    icon={UserIcon}
                    label="Specify Relationship"
                    required
                    error={errors.relationshipOther?.message}
                    touched={touchedFields.relationshipOther}
                  >
                    <input
                      type="text"
                      {...register("relationshipOther", {
                        required: "Please specify the relationship",
                      })}
                      className="w-full p-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter relationship"
                    />
                  </FormField>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                <h3 className="font-medium text-slate-900 pb-2 border-b border-slate-200">
                  Contact Information
                </h3>

                <FormField
                  icon={PhoneIcon}
                  label="Phone Number"
                  required
                  error={errors.phoneNumber?.message}
                  touched={touchedFields.phoneNumber}
                >
                  <input
                    type="tel"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Please enter a valid Indian phone number",
                      },
                    })}
                    className="w-full p-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter 10-digit phone number"
                  />
                </FormField>

                <FormField
                  icon={EnvelopeIcon}
                  label="Email Address"
                  error={errors.email?.message}
                  touched={touchedFields.email}
                >
                  <input
                    type="email"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="w-full p-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter email address"
                  />
                </FormField>

                <FormField
                  icon={MapPinIcon}
                  label="Address"
                  touched={touchedFields.address}
                >
                  <textarea
                    {...register("address")}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 min-h-[100px] resize-none"
                    placeholder="Enter complete address"
                  />
                </FormField>
              </div>

              {/* Additional Information */}
              <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                <h3 className="font-medium text-slate-900 pb-2 border-b border-slate-200">
                  Additional Information
                </h3>

                <FormField
                  icon={CalendarIcon}
                  label="Date of Birth"
                  touched={touchedFields.dateOfBirth}
                >
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="w-full p-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  />
                </FormField>

                <FormField
                  icon={IdentificationIcon}
                  label="Identification"
                  touched={touchedFields.identificationType}
                >
                  <div className="flex space-x-2">
                    <select
                      {...register("identificationType")}
                      className="w-1/3 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="PAN">PAN</option>
                      <option value="Aadhaar">Aadhaar</option>
                      <option value="Passport">Passport</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="text"
                      {...register("identificationNumber")}
                      className="w-2/3 p-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter ID number"
                    />
                  </div>
                </FormField>
              </div>
            </div>

            {/* Form Alert */}
            <div className="bg-gradient-to-r from-slate-50 to-white p-4 rounded-lg border border-slate-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600">
                  All information is securely stored and encrypted. Only
                  authorized personnel can access this data.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t bg-slate-50 p-4 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isDirty || isLoading || isSaving}
              className="relative inline-flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[140px] justify-center overflow-hidden"
            >
              {/* Progress bar */}
              {isSaving && (
                <div
                  className="absolute inset-0 bg-green-500 transition-all duration-200 ease-out opacity-20"
                  style={{ width: `${saveProgress}%` }}
                />
              )}

              {/* Button content */}
              <div className="relative flex items-center justify-center">
                {isSaving ? (
                  <>
                    <div className="animate-pulse flex items-center">
                      <LoadingSpinner />
                      <span className="ml-2">
                        {saveProgress < 100 ? "Saving..." : "Completing..."}
                      </span>
                    </div>
                  </>
                ) : isLoading || isSubmitting ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    {initialData ? "Update Nominee" : "Save Nominee"}
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
