import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={cn("glass-card p-6 glow-purple", className)}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-6", className)}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <h3 className={cn("text-2xl font-bold leading-none tracking-tight text-gradient", className)}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <p className={cn("text-sm text-gray-300", className)}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={cn("flex items-center pt-6", className)}>
      {children}
    </div>
  );
};