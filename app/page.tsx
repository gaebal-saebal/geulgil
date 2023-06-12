'use client';
import React from 'react';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div>
      <Button
        onClick={() => {
          fetch('/api/new', { method: 'POST' })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        글쓰기
      </Button>
      <Button
        onClick={() => {
          console.log(process.env.NEXT_PUBLIC_API_KEY);
          console.log(process.env.NEXT_PUBLIC_MONGODB_URL);
          console.log(process.env.NEXT_PUBLIC_GITHUB_CLIENTID);
          console.log(process.env.NEXT_PUBLIC_GITHUB_CLIENTSECRET);
        }}
      >
        콘솔찍기
      </Button>
    </div>
  );
}
