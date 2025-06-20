"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick : ()=>void;
}

export default function Button({ children, className, onClick }: ButtonProps){
  return (
    <div onClick={onClick}>
        <button 
      className={`py-2 px-4 text-white cursor-pointer rounded-lg font-bold bg-blue-700 hover:bg-blue-900 w-full ${className}`}>
        {children}
        </button>
    </div>
  );
};
