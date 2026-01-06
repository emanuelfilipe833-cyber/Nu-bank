
import React from 'react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => {
  return (
    <div className="flex flex-col items-center min-w-[80px] cursor-pointer" onClick={onClick}>
      <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-2 hover:bg-zinc-800 transition-colors text-white">
        {icon}
      </div>
      <span className="text-sm font-medium text-center text-zinc-300">{label}</span>
    </div>
  );
};
