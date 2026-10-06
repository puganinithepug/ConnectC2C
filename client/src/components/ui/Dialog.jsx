import React from 'react';
import ReactDOM from 'react-dom';

const DialogContext = React.createContext();

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  const content = (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <div className="fixed inset-0 z-50">
        {children}
      </div>
    </DialogContext.Provider>
  );

  // Render in a portal so it's not constrained by any transformed ancestors (like the sticky header)
  if (typeof document !== 'undefined') {
    return ReactDOM.createPortal(content, document.body);
  }

  // Fallback (shouldn't normally hit in the browser)
  return content;
}

export function DialogOverlay({ className = '' }) {
  const context = React.useContext(DialogContext);

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${className}`}
      onClick={() => context.onOpenChange(false)}
    />
  );
}

export function DialogContent({ className = '', children, ...props }) {
  return (
    <>
      <DialogOverlay />
      <div
        className={`fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
}

export function DialogHeader({ className = '', ...props }) {
  return (
    <div
      className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
      {...props}
    />
  );
}
