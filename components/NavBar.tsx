import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  return (
    <div>
      <Link href='/'>메인</Link>
      <Link href='/signup'>회원가입</Link>
      <Link href='/login'>로그인</Link>
    </div>
  );
};

export default NavBar;
