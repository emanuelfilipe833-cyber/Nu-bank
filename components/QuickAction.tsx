
import React from 'react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => {
  return (
    <div className="flex flex-col items-center min-w-[80px] cursor-pointer" onClick={onClick}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 hover:bg-gray-200 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-center">{label}</span>
    </div>
  );
};
