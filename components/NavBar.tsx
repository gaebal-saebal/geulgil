'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { sessionState } from '@/store/store';
import { signIn, signOut } from 'next-auth/react';

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
          <button onClick={() => signIn(undefined, { callbackUrl: '/' })}>로그인</button>
        </>
      ) : (
        <>
          {name}
          <button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</button>
        </>
      )}
    </div>
  );
};

export default NavBar;
