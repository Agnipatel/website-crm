"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function MultiSelect({
  name,
  options,
  placeholder = "Select options",
  className,
  required = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const displayText =
    selected.length === 0
      ? placeholder
      : selected.length === 1
      ? options.find((o) => o.value === selected[0])?.label || selected[0]
      : `${selected.length} services selected`;

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Hidden input for FormData extraction */}
      <input
        type="hidden"
        name={name}
        value={selected.join(", ")}
      />
      {/* Fallback required input since hidden inputs cannot trigger browser validation natively in an easy way */}
      {required && selected.length === 0 && (
        <input 
          type="text" 
          required 
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none -z-10" 
        />
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between gap-1.5 rounded-xl border bg-transparent px-4 py-3 text-sm transition-all focus:outline-none",
          className,
          isOpen ? "ring-1 ring-green-500 border-green-500" : ""
        )}
      >
        <span
          className={
            selected.length === 0
              ? "text-zinc-400 dark:text-zinc-400"
              : "text-black dark:text-white line-clamp-1 text-left"
          }
        >
          {displayText}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
      </button>

      {isOpen && (
        <div className="absolute z-[200] mt-2 w-full max-h-60 overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-xl animate-in fade-in-0 zoom-in-95 custom-scrollbar">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={cn(
                  "relative flex w-full cursor-pointer items-center rounded-lg py-2.5 pl-9 pr-3 text-sm text-black dark:text-white outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                  isSelected && "bg-zinc-100 dark:bg-zinc-800/80 font-medium"
                )}
              >
                <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
                  {isSelected && <Check className="h-4 w-4 text-green-500" />}
                </span>
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
