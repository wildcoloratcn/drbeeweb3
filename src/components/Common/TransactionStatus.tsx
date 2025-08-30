import React from "react";

interface TransactionStatusProps {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  message,
}) => {
  if (status === "idle") return null;

  const statusConfig = {
    loading: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      icon: "⏳",
      defaultMessage: "Transaction in progress...",
    },
    success: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: "✅",
      defaultMessage: "Transaction successful!",
    },
    error: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      icon: "❌",
      defaultMessage: "Transaction failed. Please try again.",
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`p-4 rounded-md ${config.bgColor} ${config.textColor} mb-4`}>
      <div className="flex items-center">
        <span className="mr-2 text-xl">{config.icon}</span>
        <span>{message || config.defaultMessage}</span>
      </div>
    </div>
  );
};