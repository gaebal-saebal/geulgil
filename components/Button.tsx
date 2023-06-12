import React from 'react';
import { ButtonPropsType } from '@/types/interface';

const Button = ({ onClick, children }: ButtonPropsType) => {
  return (
    <button onClick={onClick} className='px-4 py-2 border-2 hover:bg-slate-400'>
      {children}
    </button>
  );
};

export default Button;
