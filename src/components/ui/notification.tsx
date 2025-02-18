import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const backgroundColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const borderColor =
    type === "success" ? "border-green-200" : "border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircleIcon : ExclamationCircleIcon;
  const iconColor = type === "success" ? "text-green-500" : "text-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 ${backgroundColor} border ${borderColor} rounded-lg shadow-lg p-4 max-w-sm`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${iconColor} mt-0.5`} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export const NotificationContainer: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setNotificationData({
        message: location.state.message,
        type: location.state.type || "success",
      });
      setShowNotification(true);

      // Clear the location state
      navigate(location.pathname, { replace: true });

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <AnimatePresence>
      {showNotification && notificationData && (
        <Notification
          message={notificationData.message}
          type={notificationData.type}
          onClose={handleClose}
        />
      )}
    </AnimatePresence>
  );
};

export default NotificationContainer;
