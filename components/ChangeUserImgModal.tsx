import { ModalProps } from '@/types/type';
import React from 'react';

const ChangeUserImgModal = ({ onChange, onClick, onClose }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className='flex justify-center pt-20 absolute inset-0 z-50 bg-[rgba(0,0,0,0.5)] '
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className='relative w-[300px] h-[200px] bg-white overflow-hidden rounded-md shadow-lg shadow-indigo-500/50 p-[20px] '
      >
        <div className='flex flex-col justify-center h-3/4 '>
          <span>변경 할 이미지 주소를 입력해주세요.</span>
          <input
            onChange={onChange}
            type='text'
            placeholder='변경할 URL주소'
            autoFocus
            className='w-full mt-3'
          />
        </div>
        <div className='flex items-end h-1/4 justify-evenly'>
          <button
            onClick={onClick}
            className='px-3 py-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'
          >
            추가
          </button>
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

export default ChangeUserImgModal;
