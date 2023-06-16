'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { sessionState } from '@/store/store';
import { signIn, signOut } from 'next-auth/react';

const NavBar = () => {
  const [session, setSession] = useState<{
    user: { _id: string; email: string; name: string };
  } | null>();
  const { id, name, setId, setName, setEmail } = sessionState();

  const GET_SESSION_URL = `/api/users/getUserSession`;

  const handleLogin = () => {
    signIn(undefined, { callbackUrl: '/' });
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
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

  useEffect(() => {
    getSession();
  }, []);

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

      <Link href={`/search`}>검색페이지</Link>
    </div>
  );
};

export default NavBar;
