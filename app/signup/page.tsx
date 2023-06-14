'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string): void => {
    if (type === 'name') {
      setName(e.target.value);
    } else if (type === 'email') {
      setEmail(e.target.value);
    } else if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = () => {
    fetch('/api/auth/signUp', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          router.push('/');
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            handleChange(e, 'name');
          }}
          type='text'
          placeholder='이름'
        />
        <input
          onChange={(e) => {
            handleChange(e, 'email');
          }}
          type='text'
          placeholder='이메일'
        />
        <input
          onChange={(e) => {
            handleChange(e, 'password');
          }}
          type='password'
          placeholder='비번'
        />
        <button onClick={handleSubmit}>id/pw 가입요청</button>
      </div>
    </div>
  );
};

export default Signup;
