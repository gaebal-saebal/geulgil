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
    </div>
  );
}
