import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AssetCategory } from "../../types/assets";

interface AssetLinkingSuccessProps {
  assetType: AssetCategory;
  assetTitle: string;
  providerName: string;
  returnPath?: string;
}

// Define confetti animation
const confettiVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const AssetLinkingSuccess: React.FC<AssetLinkingSuccessProps> = ({
  // assetType,
  assetTitle,
  providerName,
  returnPath = "/dashboard",
}) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Simulate progress of setting up the asset
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a moment after completion before redirecting
          setTimeout(() => setRedirect(true), 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 250);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Navigate away when redirect state becomes true
    if (redirect) {
      navigate(returnPath, { state: { linkingSuccess: true } });
    }
  }, [redirect, navigate, returnPath]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full mx-auto p-8 text-center"
      >
        {/* Success Icon Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Successfully Linked!
        </h2>
        <p className="text-slate-600 mb-8">
          Your {assetTitle} from {providerName} has been successfully linked to
          your account.
        </p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-green-500 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>Setting up your account</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Confetti Animation - Simple Colored Dots */}
        <div className="relative h-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              variants={confettiVariants}
              initial="initial"
              animate="animate"
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              className={`absolute w-3 h-3 rounded-full`}
              style={{
                backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"][
                  i % 4
                ],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Redirect Message */}
        <div className="mt-8 text-sm text-slate-600 flex items-center justify-center">
          <span>Redirecting to dashboard</span>
          <ChevronRightIcon className="h-4 w-4 ml-1 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};
