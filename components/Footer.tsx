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
    <div className='absolute bottom-0 left-0 flex flex-col items-center justify-between w-full h-64 p-6 text-white bg-black'>
      <div className='flex flex-col justify-between w-full h-full max-w-screen-xl'>
        <div className='flex justify-between'>
          <ul>
            <div className='mb-2 text-gray-300'>DEVELOPER</div>
            <li className='mb-1'>
              <Link
                href='https://github.com/rosenfence'
                target='_blank'
                className='hover:text-orange-400'
                prefetch={false}
              >
                신창하
              </Link>
            </li>
            <li>
              <Link
                href='https://github.com/js-ha'
                target='_blank'
                className='hover:text-orange-400'
                prefetch={false}
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
              prefetch={false}
            >
              <FaGithub />
            </Link>
            <Link
              className='mr-2 hover:text-orange-400'
              href='http://pf.kakao.com/_xexaxePxj/chat'
              target='_blank'
              prefetch={false}
            >
              <RiKakaoTalkFill />
            </Link>
            <Link href='/' className='hover:text-orange-400' prefetch={false}>
              <FaInstagramSquare />
            </Link>
          </div>
        </div>
        <div className='flex w-full'>
          {screenWidth > 768 ? (
            <div className='w-1/5 '>
              <img src='/imgLogo.svg' alt='big-logo' className='h-16' />
            </div>
          ) : (
            <div className='w-1/5 '>
              <img src='/ico.png' alt='small-logo' className='h-14' />
            </div>
          )}

          <div className='flex items-end justify-between w-4/5'>
            <div className='pl-3 text-xs'>
              © 2023 Gaebal-Saebal
              <Link href='https://github.com/gaebal-saebal/geulgil'>{` <https://github.com/gaebal-saebal>`}</Link>
            </div>
            <div className='flex flex-col'>
              <Link
                href='http://pf.kakao.com/_xexaxePxj/chat'
                target='_blank'
                className='text-sm hover:text-orange-400'
                prefetch={false}
              >
                문의상담
              </Link>
              <Link
                href='http://pf.kakao.com/_xexaxePxj/chat'
                target='_blank'
                className='text-sm hover:text-orange-400'
                prefetch={false}
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
