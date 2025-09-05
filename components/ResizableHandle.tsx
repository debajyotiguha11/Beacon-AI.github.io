import React from 'react';

interface ResizableHandleProps {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const ResizableHandle: React.FC<ResizableHandleProps> = ({ onMouseDown }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      className="flex-shrink-0 w-2.5 cursor-col-resize flex items-center justify-center group"
      aria-hidden="true"
      role="separator"
      aria-orientation="vertical"
    >
      <div className="w-1 h-10 bg-slate-300 rounded-full group-hover:bg-walmart-blue transition-colors duration-200"></div>
    </div>
  );
};
