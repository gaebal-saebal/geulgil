'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookListOnMainType } from '@/types/interface';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [queryType, setQueryType] = useState('title');
  const [searchTarget, setSearchTarget] = useState('book');
  const [searchLists, setSearchLists] = useState<BookListOnMainType[]>([]);

  const SEARCH_BOOK_URL = `/api/books/getSearchBooks?searchKeyword=${searchKeyword}&queryType=${queryType}&searchTarget=${searchTarget}`;

  const handleSearch = () => {
    fetch(SEARCH_BOOK_URL)
      .then((res) => res.json())
      .then((data) => {
        setSearchLists(data.item);
        console.log(data);
      });
  };

  return (
    <div>
      <select onChange={(e) => setQueryType(e.target.value)}>
        <option value='title'>도서명</option>
        <option value='author'>저자</option>
      </select>
      <select onChange={(e) => setSearchTarget(e.target.value)}>
        <option value='book'>국내도서</option>
        <option value='foreign'>외국도서</option>
      </select>
      <input
        type='text'
        placeholder='도서 검색'
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button onClick={() => handleSearch()}>검색</button>
      <div>{searchKeyword}를(을) 검색한 결과입니다.</div>
      <div className='max-w-screen-2xl'>
        <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {searchLists.map((list, i) => {
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

export default Search;
