"use client";

import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onChange, 
  title, 
  description, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-neutral-900/90 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-neutral-800 border border-neutral-700 h-full md:h-auto md:max-h-[85vh] w-full md:w-[500px] rounded-md drop-shadow-md p-6 overflow-y-auto focus:outline-none">
        
        <div className="flex items-center justify-between mb-4">
            <div className="text-xl text-center font-bold mb-1">
                {title}
            </div>
            <button 
                onClick={() => onChange(false)} 
                className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px]"
            >
                <X size={20}/>
            </button>
        </div>
        
        <div className="text-sm leading-normal text-center mb-5 font-normal">
            {description}
        </div>
        
        <div>
            {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;