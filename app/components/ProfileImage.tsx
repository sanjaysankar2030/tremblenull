'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProfileImage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Clickable Image Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        onContextMenu={handleContextMenu}
        title="Zoom In"
        className="relative h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 overflow-hidden flex-shrink-0 rounded-4xl cursor-zoom-in group select-none outline-none"
      >
        <Image
          src="/178389178.png"
          alt="Profile"
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-200"
          priority
        />
      </button>

      {/* Secure Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white text-lg font-mono tracking-wider"
            onClick={() => setIsOpen(false)}
          >
            [ X ]
          </button>

          <div 
            className="relative w-[85vw] h-[85vh] max-w-3xl max-h-3xl select-none"
            onClick={(e) => e.stopPropagation()} 
            onContextMenu={handleContextMenu}
          >
            <Image
              src="/178389178.png"
              alt="Profile Picture Expanded"
              fill
              className="object-contain pointer-events-none select-none"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}