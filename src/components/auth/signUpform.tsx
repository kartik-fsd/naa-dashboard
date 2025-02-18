import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { User } from "../../types/auth";

interface SignUpFormProps {
  phoneNumber: string;
  onBack: () => void;
  isLoading?: boolean;
  onSubmit: (userData: Omit<User, "id">) => Promise<void>;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  phoneNumber,
  onBack,
  isLoading,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    panNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      // Only pass the required fields for User type
      await onSubmit({
        name: formData.name,
        email: formData.email,
        panNumber: formData.panNumber,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses =
    "block w-full px-4 py-3 bg-navy/50 border border-platinum/10 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-platinum placeholder-platinum/50";
  const labelClasses = "block text-sm font-medium text-platinum";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputClasses}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClasses}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="panNumber" className={labelClasses}>
              PAN Number
            </label>
            <div className="mt-1">
              <input
                id="panNumber"
                name="panNumber"
                type="text"
                required
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                className={inputClasses}
                placeholder="ABCDE1234F"
                value={formData.panNumber}
                onChange={handleChange}
              />
            </div>
            <p className="mt-1 text-xs text-platinum/70">Format: ABCDE1234F</p>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className={labelClasses}>
              Date of Birth
            </label>
            <div className="mt-1">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className={inputClasses}
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClasses}>
            Address
          </label>
          <div className="mt-1">
            <input
              id="address"
              name="address"
              type="text"
              required
              className={inputClasses}
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className={labelClasses}>
              City
            </label>
            <div className="mt-1">
              <input
                id="city"
                name="city"
                type="text"
                required
                className={inputClasses}
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="state" className={labelClasses}>
              State
            </label>
            <div className="mt-1">
              <input
                id="state"
                name="state"
                type="text"
                required
                className={inputClasses}
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="pincode" className={labelClasses}>
              PIN Code
            </label>
            <div className="mt-1">
              <input
                id="pincode"
                name="pincode"
                type="text"
                required
                pattern="[0-9]{6}"
                className={inputClasses}
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-navy/50 border border-platinum/10 rounded-lg text-platinum hover:bg-navy/70 focus:outline-none focus:ring-2 focus:ring-accent transition-colors font-medium"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg bg-accent hover:bg-gold text-graphite font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <ArrowPathIcon className="animate-spin h-5 w-5" />
          ) : (
            <>
              Create Account
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
