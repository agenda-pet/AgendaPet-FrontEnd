import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CampoDataProps {
  label?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

const InputData = ({ label = "Data:", value, onChange }: CampoDataProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-xs font-sans">
      <label className="text-sm font-medium text-zinc-800">
        {label}
      </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-between p-[16] bg-[#f1ebd9] h-[58] hover:bg-[#e7dec3] text-zinc-900 border-2 !border-[#FFA800] rounded-xl !p-4 font-normal text-left transition-colors data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
                !value && "text-zinc-500"
              )}
            >
              {value ? (
                format(value, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto p-0 bg-[#e7dec3] border !border-[#FFA800] rounded-xl shadow-lg"
          >
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              // initialFocus
              locale={ptBR}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
    </div>
  );
}

export default InputData;