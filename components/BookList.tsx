import { BookListOnMainType } from '@/types/interface';
import Link from 'next/link';
import React from 'react';

const BookList = ({ lists }: { lists: BookListOnMainType[] }) => {
  return (
    <div className='max-w-screen-2xl'>
      <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {lists.map((list, i) => {
          return (
            <li key={i} className='flex flex-col p-6'>
              <Link href={`/book/${list.isbn}`}>
                <img src={list.coverLargeUrl} />
              </Link>
              <div>{list.title}</div>
              <div>{list.author}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookList;
