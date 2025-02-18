// OTPInput.tsx
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface OTPInputProps {
  onSubmit: (otp: string) => void;
  isLoading?: boolean;
  onBack: () => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  onSubmit,
  isLoading,
  onBack,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      onSubmit(otpString);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-platinum">
          Enter Verification Code
        </label>
        <div className="mt-2">
          <div className="flex gap-2 justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold bg-navy/50 border border-platinum/10 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-platinum"
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-platinum/70">
          Enter the 6-digit code sent to your phone
        </p>
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
          disabled={isLoading || otp.join("").length !== 6}
          className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg bg-accent hover:bg-gold text-graphite font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <ArrowPathIcon className="animate-spin h-5 w-5" />
          ) : (
            <>
              Verify
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
