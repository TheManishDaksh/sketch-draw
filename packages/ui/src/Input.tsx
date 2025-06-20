import { ChangeEvent } from "react";

interface inputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
}

export default function input({
  label,
  placeholder,
  value,
  onChange,
  type ,
}:inputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className=" font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 shadow-2xl"
      />
    </div>
  );
};
