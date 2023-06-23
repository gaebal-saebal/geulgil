import React from 'react';
import BookListOnMain from '@/components/BookListOnMain';

export default async function Home() {
  return (
    <div className='flex justify-center'>
      <BookListOnMain />
    </div>
  );
}
