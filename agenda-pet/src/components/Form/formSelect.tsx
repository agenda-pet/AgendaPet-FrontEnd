import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Opcao {
  valor: string;
  rotulo: string;
}

interface FormSelectProps {
  label: string;
  placeholder: React.ReactNode;
  value: string;
  onValueChange: (valor: string) => void;
  opcoes: Opcao[];
  disabled?: boolean;
  icone?: React.ReactNode;
}

const FormSelect = ({
  label,
  placeholder,
  value,
  onValueChange,
  opcoes,
  disabled = false,
  icone,
}: FormSelectProps) => {
  return (
    // Definimos a div principal para se comportar como coluna e empurrar o select para a base
    <div className="flex flex-col justify-end w-full h-[58]]">
      <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        {/* TROCADO: Saiu h-11, entrou h-4/5 para ficar idêntico ao tamanho do Input do Tutor */}
        <SelectTrigger className="w-full p-[16] h-[58] justify-between bg-[#f1ebd9] hover:bg-[#e7dec3] text-zinc-900 border-2 border-[#FFA800] rounded-xl px-4 shadow-sm font-normal text-left transition-colors data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed">
          <span className="flex items-center gap-2">
            {icone}
            {value ? <SelectValue /> : placeholder}
          </span>
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={4}
          className="bg-[#f8f4e8] border border-amber-500/30 rounded-xl max-h-60 overflow-y-auto"
        >
          {opcoes.map((op) => (
            <SelectItem
              key={op.valor}
              value={op.valor}
              className="cursor-pointer hover:bg-[#e7dec3] rounded-lg text-zinc-800 focus:bg-[#e7dec3] focus:text-zinc-900"
            >
              {op.rotulo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;