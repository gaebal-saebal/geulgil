'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { sessionState } from '@/store/store';
import { signIn, signOut } from 'next-auth/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdCloseCircle } from 'react-icons/io';
import Modal from './Modal';

const NavBar = () => {
  const [session, setSession] = useState<{
    user: { _id: string; email: string; name: string };
  } | null>();
  const [openMenu, setOpenMenu] = useState(false);
  const [myInfo, setMyInfo] = useState<{ name: string; email: string; image: string }>();
  const [screenWidth, setScreenWidth] = useState(0);
  const { id, name, setId, setName, setEmail } = sessionState();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [queryType, setQueryType] = useState('title');

  const [openModal, setOpenModal] = useState(false);

  const GET_SESSION_URL = `/api/users/getUserSession`;
  const GET_USER_INFORMATION_URL = `/api/users/getUserInfo?userId=`;

  const handleLogin = () => {
    signIn(undefined, { callbackUrl: '/' });
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const getSession = () => {
    fetch(GET_SESSION_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'bad request') {
          setSession(data);
        } else setSession(null);
      })
      .catch((err) => console.log(err));
  };

  const getUserInfo = () => {
    fetch(GET_USER_INFORMATION_URL + session?.user._id)
      .then((res) => res.json())
      .then((data) => setMyInfo(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleResize();
    getSession();
  }, []);

  useEffect(() => {
    if (session) {
      setId(session.user._id);
      setName(session.user.name);
      setEmail(session.user.email);
      getUserInfo();
    }
  }, [session]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {openModal ? (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
          modalContent={`검색어를 입력해주세요.`}
        />
      ) : null}

      <div className='absolute top-0 left-0 flex w-full items-center h-16 bg-[teal] px-5 justify-center'>
        <div className='flex w-full h-full max-w-screen-xl'>
          <div className='flex items-center w-1/4 h-full'>
            <span onClick={() => setOpenMenu(!openMenu)} className='mr-5 cursor-pointer'>
              {openMenu ? (
                <IoMdCloseCircle className='text-4xl text-gray-200' />
              ) : (
                <GiHamburgerMenu className='text-4xl text-gray-200' />
              )}
            </span>
            <div className='w-32'>
              <Link href='/' prefetch={false}>
                {screenWidth > 790 ? (
                  <img src='/imgLogo.svg' alt='logo' />
                ) : (
                  <img className='h-[32px]' src='/ico.png' alt='logo-mini' />
                )}
              </Link>
            </div>
          </div>

          <div className='w-1/2 h-full flex-center'>
            <div className='w-full h-3/5 flex-center'>
              <select
                onChange={(e) => setQueryType(e.target.value)}
                className='hidden h-full pl-3 bg-white rounded-l-lg outline-0 sm:flex'
              >
                <option value='title'>도서명</option>
                <option value='author'>저자</option>
              </select>
              <input
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    if (searchKeyword.length > 0) {
                      window.location.href = `/search?searchKeyword=${searchKeyword}&queryType=${queryType}&searchTarget=book&start=1`;
                    } else {
                      setOpenModal(true);
                    }
                  }
                }}
                className='w-1/2 h-full px-2 rounded-l-lg outline-0 sm:rounded-none'
              />
              <button
                className='w-8 h-full px-3 duration-300 bg-white rounded-r-lg sm:bg-red-200 sm:w-20 flex-center hover:bg-red-300'
                onClick={() => {
                  if (searchKeyword.length > 0) {
                    window.location.href = `/search?searchKeyword=${searchKeyword}&queryType=${queryType}&searchTarget=book&start=1`;
                  } else {
                    setOpenModal(true);
                  }
                }}
              >
                {screenWidth > 640 ? '검색' : '🔍'}
              </button>
            </div>
          </div>

          <div className='items-center justify-end hidden w-1/4 h-full md:flex'>
            {session === null ? (
              <>
                <Link className='text-gray-200' href='/signup' prefetch={false}>
                  회원가입
                </Link>
                <button className='ml-4 text-gray-200' onClick={handleLogin}>
                  로그인
                </button>
              </>
            ) : (
              <>
                <Link className='flex items-center h-full' href={`/user/${id}`} prefetch={false}>
                  {myInfo !== undefined ? (
                    <>
                      <img
                        className='mr-1 rounded-full h-1/2'
                        src={myInfo.image}
                        alt='user-image'
                      />
                      <span className='hidden text-gray-200 sm:flex'>{name}</span>
                    </>
                  ) : null}
                </Link>
                {myInfo !== undefined ? (
                  <button className='ml-5 text-gray-200' onClick={handleLogout}>
                    로그아웃
                  </button>
                ) : null}
              </>
            )}
          </div>
        </div>
        <div
          className={`absolute flex duration-500 top-16 left-0 w-full bg-[teal] ${
            openMenu ? 'h-40 py-4' : 'h-0'
          }`}
        >
          {openMenu ? (
            <div className='flex justify-around w-full h-full '>
              <div className='flex flex-col items-center justify-around'>
                <Link
                  onClick={() => setOpenMenu(!openMenu)}
                  href='/notice'
                  className='text-gray-200 hover:text-gray-300'
                  prefetch={false}
                >
                  공지사항
                </Link>
                <Link
                  onClick={() => setOpenMenu(!openMenu)}
                  href='/faq'
                  className='text-gray-200 hover:text-gray-300'
                  prefetch={false}
                >
                  FAQ
                </Link>
                <Link
                  onClick={() => setOpenMenu(!openMenu)}
                  href='http://pf.kakao.com/_xexaxePxj/chat'
                  target='_blank'
                  className='text-gray-200 hover:text-gray-300'
                >
                  문의하기
                </Link>
              </div>
              <div className='flex flex-col items-center justify-around'>
                {session === null ? (
                  <>
                    <Link
                      onClick={() => setOpenMenu(!openMenu)}
                      href='/signUp'
                      className='text-gray-200 hover:text-gray-300'
                    >
                      회원가입
                    </Link>
                    <button onClick={handleLogin} className='text-gray-200 hover:text-gray-300'>
                      로그인
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={() => setOpenMenu(!openMenu)}
                      href={`/user/${id}`}
                      className='text-gray-200 hover:text-gray-300'
                    >
                      마이페이지
                    </Link>
                    <button className='text-gray-200 hover:text-gray-300' onClick={handleLogout}>
                      로그아웃
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NavBar;
