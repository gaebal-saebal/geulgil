'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { sessionState } from '@/store/store';
import { signOut } from 'next-auth/react';

const NavBar = ({ session }: any) => {
  const { name, setName, setEmail } = sessionState();

  useEffect(() => {
    if (session) {
      setName(session.user.name);
      setEmail(session.user.email);
    }
  }, [session]);

  return (
    <div>
      <Link href='/'>메인</Link>
      {session === null ? (
        <>
          <Link href='/signup'>회원가입</Link>
          <Link href='/login'>로그인</Link>
        </>
      ) : (
        <>
          {name}
          <span onClick={() => signOut()}>로그아웃</span>
        </>
      )}
    </div>
  );
};

export default NavBar;
