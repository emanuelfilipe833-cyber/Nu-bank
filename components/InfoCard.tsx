
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface InfoCardProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children, onClick }) => {
  return (
    <div className="p-6 border-b border-gray-100 cursor-pointer active:bg-gray-50" onClick={onClick}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <ChevronRight className="text-gray-400 w-5 h-5" />
      </div>
      {children}
    </div>
  );
};
