// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   ShieldCheckIcon,
//   DocumentCheckIcon,
//   ExclamationCircleIcon,
//   ArrowPathIcon,
//   CheckCircleIcon,
//   ChartBarIcon,
// } from "@heroicons/react/24/outline";

// type AuthStep = "RTA" | "LOGIN" | "VERIFY" | "FETCH" | "CONFIRM";

// interface MutualFundAuthProps {
//   returnUrl?: string;
// }

// const RTAs = [
//   {
//     id: "cams",
//     name: "CAMS",
//     fullName: "Computer Age Management Services",
//     description: "Handles funds from HDFC, SBI, Aditya Birla, and more",
//     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKorx8AblOXKCEwnrja7qQSosxC_V1YMxoCA&s",
//   },
//   {
//     id: "kfintech",
//     name: "KFintech",
//     fullName: "KFin Technologies Limited",
//     description: "Handles funds from ICICI, Nippon, Axis, and more",
//     logo: "https://www.kfintech.com/wp-content/uploads/2023/11/Group-1000002745.png",
//   },
// ];

// const MutualFundAuth: React.FC<MutualFundAuthProps> = ({
//   returnUrl = "/auth/callback",
// }) => {
//   const [step, setStep] = useState<AuthStep>("RTA");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRTA, setSelectedRTA] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     pan: "",
//     email: "",
//     mobile: "",
//     dob: "",
//   });
//   const [fetchProgress, setFetchProgress] = useState(0);

//   const handleRTASelect = (rtaId: string) => {
//     setSelectedRTA(rtaId);
//     setStep("LOGIN");
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Validate PAN format
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     if (!panRegex.test(formData.pan)) {
//       setError("Invalid PAN format");
//       setLoading(false);
//       return;
//     }

//     // Validate mobile format
//     const mobileRegex = /^[6-9]\d{9}$/;
//     if (!mobileRegex.test(formData.mobile)) {
//       setError("Invalid mobile number");
//       setLoading(false);
//       return;
//     }

//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setLoading(false);
//     setStep("VERIFY");
//   };

//   const handleVerification = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setLoading(false);
//     setStep("FETCH");

//     // Simulate fetching progress
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += 20;
//       setFetchProgress(progress);
//       if (progress >= 100) {
//         clearInterval(interval);
//         setStep("CONFIRM");
//       }
//     }, 1000);
//   };

//   const handleComplete = () => {
//     window.location.href = `${returnUrl}?status=success&type=mf&provider=${selectedRTA}`;
//   };

//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="max-w-lg w-full">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-8 text-white text-center">
//             <ChartBarIcon className="w-12 h-12 mx-auto mb-4" />
//             <h2 className="text-2xl font-semibold">Link Mutual Funds</h2>
//             <p className="mt-2 text-purple-200">Connect via RTA</p>
//           </div>

//           {/* Content */}
//           <div className="p-6">
//             {step === "RTA" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-lg font-medium text-gray-900 text-center mb-6">
//                   Select Your Registrar
//                 </h3>

//                 {RTAs.map((rta) => (
//                   <button
//                     key={rta.id}
//                     onClick={() => handleRTASelect(rta.id)}
//                     className="w-full p-4 border border-gray-300 rounded-xl hover:border-purple-500
//                              hover:shadow-md transition-all duration-200"
//                   >
//                     <div className="flex items-center">
//                       <img
//                         src={rta.logo}
//                         alt={rta.name}
//                         className="w-12 h-12 rounded-lg"
//                       />
//                       <div className="ml-4 text-left">
//                         <h4 className="font-medium text-gray-900">
//                           {rta.name}
//                         </h4>
//                         <p className="text-sm text-gray-500">{rta.fullName}</p>
//                         <p className="text-xs text-gray-400 mt-1">
//                           {rta.description}
//                         </p>
//                       </div>
//                     </div>
//                   </button>
//                 ))}

//                 <div className="mt-6 p-4 bg-purple-50 rounded-lg">
//                   <p className="text-sm text-purple-700">
//                     Not sure which one to choose? Don't worry - you can link
//                     both to fetch all your investments.
//                   </p>
//                 </div>
//               </motion.div>
//             )}

//             {step === "LOGIN" && (
//               <motion.form
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 onSubmit={handleLogin}
//                 className="space-y-5"
//               >
//                 <div className="text-center mb-6">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     Enter Your Details
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Please provide your investment account information
//                   </p>
//                 </div>

//                 {error && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
//                     <ExclamationCircleIcon className="w-5 h-5 mr-2" />
//                     {error}
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     PAN Number
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.pan}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         pan: e.target.value.toUpperCase(),
//                       })
//                     }
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2
//                              focus:ring-purple-500 focus:border-transparent"
//                     placeholder="ABCDE1234F"
//                     maxLength={10}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.dob}
//                     onChange={(e) =>
//                       setFormData({ ...formData, dob: e.target.value })
//                     }
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2
//                              focus:ring-purple-500 focus:border-transparent"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.mobile}
//                     onChange={(e) =>
//                       setFormData({ ...formData, mobile: e.target.value })
//                     }
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2
//                              focus:ring-purple-500 focus:border-transparent"
//                     placeholder="Enter 10-digit mobile"
//                     maxLength={10}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2
//                              focus:ring-purple-500 focus:border-transparent"
//                     placeholder="Enter registered email"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium
//                            hover:bg-purple-700 transition-all disabled:bg-purple-300
//                            flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <>
//                       <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
//                       Verifying...
//                     </>
//                   ) : (
//                     "Continue"
//                   )}
//                 </button>
//               </motion.form>
//             )}

//             {step === "VERIFY" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-center"
//               >
//                 <h3 className="text-lg font-medium text-gray-900 mb-6">
//                   Verify Your Mobile
//                 </h3>

//                 <p className="text-sm text-gray-600 mb-6">
//                   Enter the OTP sent to{" "}
//                   {formData.mobile.replace(
//                     /(\d{2})(\d{4})(\d{4})/,
//                     "$1XX XXX$3"
//                   )}
//                 </p>

//                 <div className="flex justify-center gap-3 mb-6">
//                   {Array(6)
//                     .fill(0)
//                     .map((_, i) => (
//                       <input
//                         key={i}
//                         type="text"
//                         maxLength={1}
//                         className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg
//                                font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       />
//                     ))}
//                 </div>

//                 <button
//                   onClick={handleVerification}
//                   disabled={loading}
//                   className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium
//                            hover:bg-purple-700 transition-all disabled:bg-purple-300"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>

//                 <p className="mt-4 text-sm text-gray-600">
//                   Didn't receive the code?{" "}
//                   <button className="text-purple-600 font-medium">
//                     Resend
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {step === "FETCH" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-center"
//               >
//                 <h3 className="text-lg font-medium text-gray-900 mb-6">
//                   Fetching Your Investments
//                 </h3>

//                 <div className="relative mb-6">
//                   <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-purple-600 transition-all duration-500"
//                       style={{ width: `${fetchProgress}%` }}
//                     />
//                   </div>
//                   <p className="mt-2 text-sm text-gray-600">
//                     {fetchProgress < 100
//                       ? "Please wait while we fetch your portfolio..."
//                       : "Complete!"}
//                   </p>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">
//                       Fetching folios...
//                     </span>
//                     <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                   </div>
//                   <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">
//                       Processing transactions...
//                     </span>
//                     {fetchProgress >= 40 && (
//                       <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                   <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">
//                       Calculating holdings...
//                     </span>
//                     {fetchProgress >= 70 && (
//                       <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                   <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
//                     <span className="text-sm text-gray-600">
//                       Finalizing setup...
//                     </span>
//                     {fetchProgress >= 90 && (
//                       <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {step === "CONFIRM" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-center"
//               >
//                 <DocumentCheckIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   Mutual Funds Linked Successfully!
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-6">
//                   We've successfully linked your investment portfolio. Your
//                   complete mutual fund portfolio is now accessible.
//                 </p>
//                 <div className="mt-6 space-y-4">
//                   <div className="bg-green-50 p-4 rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-gray-900">
//                         Folios Found
//                       </span>
//                       <span className="text-sm font-medium text-green-600">
//                         12
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium text-gray-900">
//                         Total Value
//                       </span>
//                       <span className="text-sm font-medium text-green-600">
//                         ₹8,45,230
//                       </span>
//                     </div>
//                   </div>

//                   <div className="p-4 bg-purple-50 rounded-lg text-sm text-purple-700">
//                     Your portfolio will be automatically updated daily
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleComplete}
//                   className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium
//                            hover:bg-purple-700 transition-all mt-6"
//                 >
//                   Continue to Dashboard
//                 </button>
//               </motion.div>
//             )}
//           </div>

//           {/* Security Footer */}
//           <div className="border-t border-gray-200 p-4">
//             <div className="flex items-center justify-center gap-2">
//               <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
//               <p className="text-sm text-gray-600">
//                 Secured by{" "}
//                 {selectedRTA
//                   ? RTAs.find((r) => r.id === selectedRTA)?.name
//                   : "RTA"}{" "}
//                 Network
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MutualFundAuth;
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ChartBarIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

type AuthStep = "RTA" | "LOGIN" | "VERIFY" | "FETCH" | "CONFIRM";

interface MutualFundAuthProps {
  returnUrl?: string;
}

const RTAs = [
  {
    id: "cams",
    name: "CAMS",
    fullName: "Computer Age Management Services",
    description: "Handles funds from HDFC, SBI, Aditya Birla, and more",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKorx8AblOXKCEwnrja7qQSosxC_V1YMxoCA&s",
  },
  {
    id: "kfintech",
    name: "KFintech",
    fullName: "KFin Technologies Limited",
    description: "Handles funds from ICICI, Nippon, Axis, and more",
    logo: "https://www.kfintech.com/wp-content/uploads/2023/11/Group-1000002745.png",
  },
];

const MutualFundAuth: React.FC<MutualFundAuthProps> = ({
  returnUrl = "/auth/callback",
}) => {
  const [step, setStep] = useState<AuthStep>("RTA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRTA, setSelectedRTA] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pan: "",
    email: "",
    mobile: "",
    dob: "",
  });
  const [fetchProgress, setFetchProgress] = useState(0);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const steps = ["RTA", "LOGIN", "VERIFY", "FETCH"];
  const currentStepIndex = steps.indexOf(step);

  const handleBack = () => {
    const prevSteps: Record<AuthStep, AuthStep> = {
      LOGIN: "RTA",
      VERIFY: "LOGIN",
      FETCH: "VERIFY",
      CONFIRM: "FETCH",
      RTA: "RTA",
    };
    setStep(prevSteps[step]);
  };

  const handleRTASelect = (rtaId: string) => {
    setSelectedRTA(rtaId);
    setStep("LOGIN");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan)) {
      setError("Please enter a valid PAN number");
      setLoading(false);
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setError("Please enter a valid mobile number");
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("VERIFY");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(
          `input[name=otp-${index + 1}]`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("FETCH");

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setFetchProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setStep("CONFIRM");
      }
    }, 1000);
  };

  const handleComplete = () => {
    window.location.href = `${returnUrl}?status=success&type=mf&provider=${selectedRTA}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {/* Progress Steps */}
        {step !== "CONFIRM" && (
          <div className="mb-6">
            <div className="flex items-center justify-between w-full px-4">
              {steps.map((s, index) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                        ${
                          index <= currentStepIndex
                            ? "border-slate-600 bg-slate-50"
                            : "border-gray-300 bg-white"
                        }`}
                    >
                      {index < currentStepIndex ? (
                        <CheckCircleIcon className="w-5 h-5 text-slate-600" />
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            index <= currentStepIndex
                              ? "text-slate-600"
                              : "text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        index <= currentStepIndex
                          ? "text-slate-600"
                          : "text-gray-400"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        index < currentStepIndex
                          ? "bg-slate-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-800 px-6 py-8 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <ChartBarIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Link Mutual Funds</h2>
                  <p className="text-slate-200 text-sm">
                    Secure Portfolio Access
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <LockClosedIcon className="w-5 h-5 text-slate-200" />
                <span className="text-sm text-slate-200">
                  Bank-Grade Security
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {step !== "RTA" && step !== "CONFIRM" && (
              <button
                onClick={handleBack}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-6
                         transition-colors group"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Error</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {step === "RTA" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Select Your Registrar
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Choose your mutual fund registrar to fetch your investments
                  </p>
                </div>

                <div className="grid gap-4">
                  {RTAs.map((rta) => (
                    <button
                      key={rta.id}
                      onClick={() => handleRTASelect(rta.id)}
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-slate-500
                               hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            src={rta.logo}
                            alt={rta.name}
                            className="w-12 h-12 rounded-lg object-contain"
                          />
                        </div>
                        <div className="ml-4 text-left flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-slate-600">
                            {rta.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {rta.fullName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {rta.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "LOGIN" && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Login to Your Account
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter your PAN, mobile, email, and date of birth
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    value={formData.pan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pan: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Enter your PAN"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 pl-12
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Enter 10-digit mobile"
                    maxLength={10}
                    required
                  />
                  <div className="absolute left-3 bottom-1 transform -translate-y-1/2">
                    <span className="text-sm text-gray-400">+91</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Enter registered email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                               focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Bank Grade Security
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LockClosedIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      256-bit Encryption
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.pan ||
                    !formData.mobile ||
                    !formData.email ||
                    !formData.dob
                  }
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium
                           hover:bg-slate-700 transition-all disabled:bg-slate-300
                           disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </motion.form>
            )}

            {step === "VERIFY" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Verify Your Mobile
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the 6-digit code sent to{" "}
                    {formData.mobile.replace(
                      /(\d{2})(\d{4})(\d{4})/,
                      "$1XX XXX$3"
                    )}
                  </p>
                </div>

                <form onSubmit={handleVerification}>
                  <div className="flex justify-center gap-2 mb-6">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          name={`otp-${index}`}
                          value={otp[index]}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg
                                 font-medium focus:ring-2 focus:ring-slate-500 focus:border-transparent
                                 transition-all"
                          maxLength={1}
                          pattern="[0-9]"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          required
                        />
                      ))}
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={loading || otp.join("").length !== 6}
                      className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium
                               hover:bg-slate-700 transition-all disabled:bg-slate-300
                               disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Continue"
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-slate-600 font-medium hover:text-slate-700"
                      >
                        Resend Code
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        You can request a new code in 30 seconds
                      </p>
                    </div>
                  </div>
                </form>

                <div className="bg-slate-50 p-4 rounded-lg flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-slate-500 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    This additional security step helps protect your investment
                    information.
                  </p>
                </div>
              </motion.div>
            )}

            {step === "FETCH" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Fetching Your Portfolio
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Please wait while we securely fetch your investment details
                  </p>
                </div>

                <div className="relative mb-8">
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                    <div
                      style={{ width: `${fetchProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-600 transition-all duration-500"
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-600">
                    <span>{fetchProgress}% Complete</span>
                    <span>
                      {Math.round((100 - fetchProgress) / 20)} steps remaining
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <FetchStep
                    label="Establishing Secure Connection"
                    detail="Connecting to RTA servers"
                    isComplete={fetchProgress >= 20}
                    isActive={fetchProgress < 20}
                  />
                  <FetchStep
                    label="Authenticating Credentials"
                    detail="Verifying your identity"
                    isComplete={fetchProgress >= 40}
                    isActive={fetchProgress >= 20 && fetchProgress < 40}
                  />
                  <FetchStep
                    label="Retrieving Fund Details"
                    detail="Fetching your mutual fund portfolios"
                    isComplete={fetchProgress >= 60}
                    isActive={fetchProgress >= 40 && fetchProgress < 60}
                  />
                  <FetchStep
                    label="Processing Transactions"
                    detail="Analyzing your investment history"
                    isComplete={fetchProgress >= 80}
                    isActive={fetchProgress >= 60 && fetchProgress < 80}
                  />
                  <FetchStep
                    label="Finalizing Setup"
                    detail="Setting up automatic updates"
                    isComplete={fetchProgress >= 100}
                    isActive={fetchProgress >= 80 && fetchProgress < 100}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 flex items-center justify-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>This usually takes about 2 minutes</span>
                </div>
              </motion.div>
            )}

            {step === "CONFIRM" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentCheckIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Portfolio Successfully Linked!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Your mutual fund investments are now securely connected
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Portfolio Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Value</p>
                        <p className="text-lg font-semibold text-gray-900">
                          ₹8,45,230
                        </p>
                        <span className="text-xs text-green-600">
                          +12.4% overall returns
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active Funds</p>
                        <p className="text-lg font-semibold text-gray-900">
                          12 Folios
                        </p>
                        <span className="text-xs text-gray-500">
                          Across 6 AMCs
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      What's Next?
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            Track Performance
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Monitor your portfolio's performance in real-time
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            Set Goals
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Create and track your investment goals
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            Get Insights
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Receive personalized investment insights
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg flex items-start space-x-3">
                  <InformationCircleIcon className="w-5 h-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Automatic Updates
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      Your portfolio will be automatically updated daily with
                      the latest NAVs and transactions.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full py-3 bg-slate-600 text-white rounded-lg font-medium
                           hover:bg-slate-700 transition-all flex items-center justify-center"
                >
                  Continue to Dashboard
                </button>
              </motion.div>
            )}
          </div>

          {/* Security Footer */}
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Bank Grade Security
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <LockClosedIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  End-to-End Encryption
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpXG4mNxnqwQPBOtlVG2lixFqIm2h8mammQ&s"
              alt="EPFO Logo"
              className="h-6 object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
            <img
              src="https://media.istockphoto.com/id/942287864/vector/iso-9001-2015-label-certification-new-version.jpg?s=612x612&w=0&k=20&c=BNxlzWbGc3v4GbNRSwqPrSpXQmabbjVLpxPXGMhvOaQ="
              alt="ISO Certified"
              className="h-6 object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
            <ShieldCheckIcon className="h-6 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Fetch Step Component
interface FetchStepProps {
  label: string;
  detail: string;
  isComplete: boolean;
  isActive: boolean;
}

const FetchStep: React.FC<FetchStepProps> = ({
  label,
  detail,
  isComplete,
  isActive,
}) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-300 ${
        isActive
          ? "bg-slate-50 border-slate-200"
          : isComplete
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isActive
                ? "bg-slate-100"
                : isComplete
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            {isComplete ? (
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            ) : isActive ? (
              <ArrowPathIcon className="w-5 h-5 text-slate-600 animate-spin" />
            ) : (
              <ClockIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <h4
              className={`text-sm font-medium ${
                isActive
                  ? "text-slate-900"
                  : isComplete
                  ? "text-green-900"
                  : "text-gray-900"
              }`}
            >
              {label}
            </h4>
            <p
              className={`text-xs ${
                isActive
                  ? "text-slate-600"
                  : isComplete
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {detail}
            </p>
          </div>
        </div>
        {isComplete && (
          <span className="text-xs font-medium text-green-600">Complete</span>
        )}
      </div>
    </div>
  );
};

export default MutualFundAuth;
