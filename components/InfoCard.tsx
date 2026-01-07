
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
    <div 
      className="p-6 border-b border-zinc-900/50 cursor-pointer hover:bg-zinc-900/20 active:bg-zinc-900/40 transition-all duration-200 group" 
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{icon}</div>
          <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
        </div>
        <ChevronRight className="text-zinc-600 w-5 h-5 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
      </div>
      <div className="text-zinc-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
};
