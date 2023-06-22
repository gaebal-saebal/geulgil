import { ModalProps } from '@/types/type';
import React from 'react';

const Modal = ({ onClose, modalContent }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className='flex justify-center items-center absolute inset-0 z-50 bg-[rgba(0,0,0,0.5)] '
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className='relative w-[300px] h-[200px] bg-white overflow-hidden rounded-md shadow-lg shadow-indigo-500/50 p-[20px] '
      >
        <div className='flex flex-col justify-center h-3/4 '>
          <span>{modalContent}</span>
        </div>
        <div className='flex items-end h-1/4 justify-evenly'>
          <button
            onClick={onClose}
            className='px-3 py-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'
          >
            닫기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
