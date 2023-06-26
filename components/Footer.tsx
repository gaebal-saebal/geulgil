'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaInstagramSquare } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Footer = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='flex flex-col w-full absolute bottom-0 left-0 bg-black text-white h-64 p-6 justify-between items-center'>
      <div className='max-w-screen-xl w-full h-full flex flex-col justify-between'>
        <div className='flex justify-between'>
          <ul>
            <div className='text-gray-300 mb-2'>DEVELOPER</div>
            <li className='mb-1'>
              <Link
                href='https://github.com/rosenfence'
                target='_blank'
                className='hover:text-orange-400'
              >
                신창하
              </Link>
            </li>
            <li>
              <Link
                href='https://github.com/js-ha'
                target='_blank'
                className='hover:text-orange-400'
              >
                하지수
              </Link>
            </li>
          </ul>
          <div className='flex'>
            <Link
              className='mr-2 hover:text-orange-400'
              href='https://github.com/gaebal-saebal/geulgil'
              target='_blank'
            >
              <FaGithub />
            </Link>
            <Link
              className='mr-2 hover:text-orange-400'
              href='http://pf.kakao.com/_xexaxePxj/chat'
              target='_blank'
            >
              <RiKakaoTalkFill />
            </Link>
            <Link href='/' className='hover:text-orange-400'>
              <FaInstagramSquare />
            </Link>
          </div>
        </div>
        <div className='flex w-full'>
          {screenWidth > 768 ? (
            <div className=' w-1/5'>
              <img src='/imgLogo.svg' alt='big-logo' className='h-16' />
            </div>
          ) : (
            <div className=' w-1/5'>
              <img src='/ico.png' alt='small-logo' className='h-14' />
            </div>
          )}

          <div className='flex w-4/5 justify-between items-end'>
            <div className='pl-3 text-xs'>
              © 2023 Gaebal-Saebal
              <Link href='https://github.com/gaebal-saebal/geulgil'>{` <https://github.com/gaebal-saebal>`}</Link>
            </div>
            <div className='flex flex-col'>
              <Link
                href='http://pf.kakao.com/_xexaxePxj/chat'
                target='_blank'
                className='hover:text-orange-400 text-sm'
              >
                문의상담
              </Link>
              <Link
                href='http://pf.kakao.com/_xexaxePxj/chat'
                target='_blank'
                className='hover:text-orange-400 text-sm'
              >
                광고문의
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;