import { ModalProps } from '@/types/type';
import React from 'react';

const ConfirmModal = ({ onClick, onClose }: ModalProps) => {
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
          <span>정말 탈퇴하시겠습니까?</span>
          <span>작성한 모든 데이터가 삭제됩니다.</span>
        </div>
        <div className='flex items-end h-1/4 justify-evenly'>
          <button
            onClick={onClick}
            className='px-3 py-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'
          >
            확인
          </button>
          <button
            onClick={onClose}
            className='px-3 py-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmModal;
