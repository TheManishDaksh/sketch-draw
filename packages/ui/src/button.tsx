"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick : ()=>void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`${className}py-2 px-4 text-white rounded-lg font-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
