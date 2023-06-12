import React, { useEffect, useState } from 'react';
import { BookListOnMainType } from '@/types/interface';
import Link from 'next/link';

const BookListOnMain = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch('/api/get')
      .then((res) => res.json())
      .then((data) => {
        setLists(data.item);
      });
  }, []);

  console.log(lists);

  return (
    <div>
      <strong>베스트셀러</strong>
      <div className='max-w-screen-2xl'>
        <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {lists.map((list: BookListOnMainType, i) => {
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
    </div>
  );
};

export default BookListOnMain;
