'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Modal from '@/components/Modal';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string): void => {
    if (type === 'name') {
      setName(e.target.value);
    } else if (type === 'email') {
      setEmail(e.target.value);
    } else if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  // if () {
  //   alert('Please enter a valid email');
  //   return;
  // } else if (password.length < 6) {
  //   alert('Password must be at least 6 characters');
  //   return;

  const handleSubmit = () => {
    if (name === '') {
      setModalContent('닉네임을 입력해주세요');
      setShowModal(true);
      return;
    } else if (emailRegex.test(email) === false) {
      setModalContent('올바른 이메일을 입력해주세요');
      setShowModal(true);
      return;
    } else if (password.length < 6) {
      setModalContent('비밀번호 길이는 최소 6자입니다');
      setShowModal(true);
      return;
    }

    fetch('/api/auth/signUp', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          setModalContent('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
          setShowSuccessModal(true);
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {showModal ? (
        <Modal
          onClose={() => {
            setShowModal(!showModal);
          }}
          modalContent={modalContent}
        />
      ) : null}
      {showSuccessModal ? (
        <Modal
          onClose={() => {
            signIn(undefined, { callbackUrl: '/' });
          }}
          modalContent={modalContent}
        />
      ) : null}
      <div className='flex justify-center'>
        <div className='flex flex-col items-center w-1/2 max-w-md py-6 mt-32 mb-32 bg-gray-200 rounded-lg'>
          <img src='/ico.png' alt='logo' className='w-1/5 my-6' />
          <input
            onChange={(e) => {
              handleChange(e, 'name');
            }}
            type='text'
            placeholder='닉네임'
            className='h-12 px-4 mb-4 focus:outline-none'
          />
          <input
            onChange={(e) => {
              handleChange(e, 'email');
            }}
            type='text'
            placeholder='이메일'
            className='h-12 px-4 mb-4 focus:outline-none'
          />
          <div className='h-12 pl-4 mb-4 bg-white'>
            <input
              onChange={(e) => {
                handleChange(e, 'password');
              }}
              type={showPassword ? 'text' : 'password'}
              placeholder='비밀번호'
              className='w-5/6 h-full focus:outline-none bg-none'
            />
            <span onClick={() => setShowPassword(!showPassword)} className='w-1/6 cursor-pointer'>
              {showPassword ? '🔒' : '👀'}
            </span>
          </div>
          <button
            className='px-5 py-3 mb-6 text-white bg-orange-300 border-2 rounded-lg shadow-lg hover:bg-orange-400 active:bg-orange-500'
            onClick={handleSubmit}
          >
            회원가입
          </button>
          <div className='mb-12'>
            {'계정이 이미 있으신가요? '}
            <span
              className='text-blue-500 cursor-pointer'
              onClick={() => {
                signIn(undefined, { callbackUrl: '/' });
              }}
            >
              로그인
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
