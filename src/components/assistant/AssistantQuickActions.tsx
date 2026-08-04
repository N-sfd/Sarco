"use client";

type AssistantQuickActionsProps = {
  options: readonly string[];
  onSelect: (label: string) => void;
};

export function AssistantQuickActions({ options, onSelect }: AssistantQuickActionsProps) {
  return (
    <div className="mt-1 grid w-full grid-cols-1 gap-2 @sm:grid-cols-2">
      {options.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(label)}
          className="min-h-11 border border-border bg-white px-3 py-2 text-left text-xs font-semibold text-navy hover:border-navy"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
