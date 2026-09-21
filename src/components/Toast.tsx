import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto bg-[#161513] text-[#FAF8F5] p-4 rounded-none border border-[#C5A880]/40 shadow-2xl flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-bottom-3"
          id={`toast-${t.id}`}
        >
          {t.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-editorial text-base tracking-wide text-[#FAF8F5] leading-snug">
              {t.title}
            </h4>
            <p className="text-xs text-[#C5BEB3] mt-1 leading-relaxed">
              {t.message}
            </p>
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-[#9A9387] hover:text-white transition-colors p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
