import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({ value, onValueChange, children, className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-md">
            {React.Children.map(children, child => {
              if (React.isValidElement(child) && child.type === SelectContent) {
                return React.cloneElement(child, { onClose: () => setOpen(false), onValueChange });
              }
              return null;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export function SelectTrigger({ children }) {
  return <span>{children}</span>;
}

export function SelectValue({ placeholder = 'Select...' }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children, onClose, onValueChange }) {
  return (
    <div onClick={onClose}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, { onValueChange, onClose });
        }
        return child;
      })}
    </div>
  );
}

export function SelectItem({ value, children, onValueChange, onClose }) {
  return (
    <div
      onClick={() => {
        onValueChange(value);
        onClose();
      }}
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100"
    >
      {children}
    </div>
  );
}
