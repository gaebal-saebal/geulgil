'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div>
      <button onClick={() => signIn()}>로그인</button>
    </div>
  );
};

export default Login;
