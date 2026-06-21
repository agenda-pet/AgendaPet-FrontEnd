import React from "react";
import { Input } from "@/components/ui/input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({ label, className, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
        {label}
      </label>
      <Input
        {...props}
        className="w-full !h-[58px] bg-[#f1ebd9] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:ring-offset-0"
      />
    </div>
  );
}

export default FormInput;