'use client';
import React, { useState } from 'react';

const Accordion = ({ title, content }: { title: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-3/4 mb-1 duration-500 hover:bg-red-100 rounded-xl'>
      <div
        className={`duration-500 cursor-pointer flex items-center justify-between h-16 px-4 text-2xl ${
          isOpen ? 'border-x-2 border-t-2 rounded-t-xl' : 'border-2 rounded-xl'
        }`}
        onClick={toggleAccordion}
      >
        <h3>{title}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>

      <div
        className={`duration-500 px-4 text-lg ${
          isOpen ? 'h-40 border-x-2 border-b-2 rounded-b-xl' : 'h-0'
        }`}
      >
        <p>{isOpen ? content : null}</p>
      </div>
    </div>
  );
};

export default Accordion;
