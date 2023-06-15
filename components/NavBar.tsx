'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { sessionState } from '@/store/store';
import { signIn, signOut } from 'next-auth/react';

const NavBar = ({ session }: any) => {
  const { id, name, setId, setName, setEmail } = sessionState();

  const handleLogin = () => {
    signIn(undefined, { callbackUrl: '/' });
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    if (session) {
      setId(session.user._id);
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
          <button onClick={handleLogin}>로그인</button>
        </>
      ) : (
        <>
          <Link href={`/user/${id}`}>{name}</Link>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  );
};

export default NavBar;
