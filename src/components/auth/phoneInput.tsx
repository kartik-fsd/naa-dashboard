import React, { useState } from "react";
import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PhoneInputProps {
  onSubmit: (phoneNumber: string) => void;
  isLoading?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(phoneNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-platinum"
        >
          Phone Number
        </label>
        <div className="mt-2">
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-platinum/70">+91</span>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="block w-full pl-12 pr-12 py-3 bg-navy/50 border border-platinum/10 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-platinum placeholder-platinum/40"
              placeholder="1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-platinum/50"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-platinum/70">
          We'll send you a one-time verification code
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-accent hover:bg-gold text-graphite font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <ArrowPathIcon className="animate-spin h-5 w-5" />
        ) : (
          <>
            Continue
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
};
