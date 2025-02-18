/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { PhoneInput } from "../components/auth/phoneInput";
import { OTPInput } from "../components/auth/otpInput";
import { SignUpForm } from "../components/auth/signUpform";
import security from "../assets/security.svg";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { createUser, sendOTP, verifyOTP } from "../lib/mockUpAuth";
import { User } from "../types/auth";

type AuthMode = "signin" | "signup";
type Step = "phone" | "otp" | "signup-form";

export default function Auth() {
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [step, setStep] = useState<Step>("phone");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneSubmit = async (phone: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setPhoneNumber(phone);
      const vid = await sendOTP(phone);
      setVerificationId(vid);
      setStep("otp");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (otp: string) => {
    if (!verificationId) return;
    try {
      setIsLoading(true);
      setError(null);
      const user = await verifyOTP(verificationId, otp);

      if (user) {
        // Generate a mock token - in a real app, this would come from your backend
        const mockToken = `mock-token-${Date.now()}`;
        login(mockToken, user);
      } else if (mode === "signup") {
        setStep("signup-form");
      } else {
        setError("User not found. Please sign up.");
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (userData: Omit<User, "id">) => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await createUser(userData);
      // Generate a mock token - in a real app, this would come from your backend
      const mockToken = `mock-token-${Date.now()}`;
      login(mockToken, newUser);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      setStep("phone");
      setVerificationId(null);
    } else if (step === "signup-form") {
      setStep("otp");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dark Theme Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-navy to-emerald">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          {/* Illustration */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-12 inline-block w-fit mx-auto">
            <img
              src={security}
              alt="Secure Illustration"
              className="h-32 w-32 text-white mx-auto block"
            />
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl font-bold text-white font-serif mb-6 text-center">
            {mode === "signin"
              ? "Welcome Back to FinCare!"
              : "Secure Your Financial Future with FinCare"}
          </h1>

          <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-lg text-center mx-auto">
            {mode === "signin"
              ? "Access your estate portfolio and manage your assets with confidence."
              : "Join FinCare and take control of your estate planning journey."}
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "Bank-Grade", label: "Security (RBI Approved)" },
              { value: "SEBI", label: "Registered & Compliant" },
              { value: "Compliant with", label: "Indian Succession Act" },
            ].map((stat, i) => (
              <div
                key={i}
                className="w-full bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 text-center"
              >
                <div className="text-lg font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-white/70 min-w-[120px] whitespace-normal">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Light Theme Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 relative bg-emerald">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-platinum font-serif">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h2>
            <p className="mt-4 text-platinum/70">
              {mode === "signin" ? (
                <>
                  New to our platform?{" "}
                  <button
                    onClick={() => {
                      setMode("signup");
                      setStep("phone");
                      setError(null);
                    }}
                    className="font-semibold text-accent hover:text-gold/60 transition-colors"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setMode("signin");
                      setStep("phone");
                      setError(null);
                    }}
                    className="font-semibold text-accent hover:text-gold/10 transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-navy/30 backdrop-blur-md rounded-2xl p-8 shadow-xl ring-1 ring-white/10">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-200 text-sm">
                {error}
              </div>
            )}

            {step === "phone" && (
              <PhoneInput onSubmit={handlePhoneSubmit} isLoading={isLoading} />
            )}

            {step === "otp" && (
              <OTPInput
                onSubmit={handleOTPSubmit}
                isLoading={isLoading}
                onBack={handleBack}
              />
            )}

            {step === "signup-form" && (
              <SignUpForm
                phoneNumber={phoneNumber}
                onBack={handleBack}
                isLoading={isLoading}
                onSubmit={handleSignUpSubmit}
              />
            )}
          </div>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-platinum/60">
            <ShieldCheckIcon className="h-5 w-5" />
            <span>Bank-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
