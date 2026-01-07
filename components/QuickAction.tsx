
import React from 'react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => {
  return (
    <div className="flex flex-col items-center min-w-[76px] group cursor-pointer" onClick={onClick}>
      <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-3 group-hover:bg-zinc-800 transition-all duration-200 group-active:scale-90 shadow-sm border border-zinc-800/50">
        <div className="text-zinc-100 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <span className="text-xs font-semibold text-center text-zinc-300 tracking-tight group-hover:text-zinc-100 transition-colors">
        {label}
      </span>
    </div>
  );
};
