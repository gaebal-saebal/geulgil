'use client';
import React, { useState } from 'react';
import Modal from '@/components/Modal';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  const LOGIN_URL = '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string): void => {
    if (type === 'email') {
      setEmail(e.target.value);
    } else if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (emailRegex.test(email) === false) {
      setModalContent('올바른 이메일을 입력해주세요');
      setShowModal(true);
      return;
    } else if (password.length < 6) {
      setModalContent('비밀번호 길이는 최소 6자입니다');
      setShowModal(true);
      return;
    }

    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          //TODO: 메인페이지로 이동
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
      <div className='flex justify-center'>
        <div className='flex flex-col items-center w-1/2 max-w-md py-6 mt-32 mb-32 bg-gray-200 rounded-lg'>
          <img src='/ico.png' alt='logo' className='w-1/5 my-6' />
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
            로그인
          </button>
          <div className='mb-12'>
            {'계정이 아직 없으신가요? '}
            <Link className='text-blue-500 cursor-pointer' href='/signup'>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
