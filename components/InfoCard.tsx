
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
    <div className="p-6 border-b border-zinc-900 cursor-pointer active:bg-zinc-900/50" onClick={onClick}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="text-zinc-400">{icon}</div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        <ChevronRight className="text-zinc-600 w-5 h-5" />
      </div>
      <div className="text-zinc-400">
        {children}
      </div>
    </div>
  );
};
