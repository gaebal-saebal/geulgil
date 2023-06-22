'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookListOnMainType } from '@/types/interface';
import Modal from '@/components/Modal';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [queryType, setQueryType] = useState('title');
  const [searchTarget, setSearchTarget] = useState('book');

  const [searchLists, setSearchLists] = useState<BookListOnMainType[]>([]);

  const [totalPage, setTotalPage] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const queryObject = {
    searchKeyword: urlParams.get('searchKeyword'),
    queryType: urlParams.get('queryType'),
    searchTarget: urlParams.get('searchTarget'),
    start: urlParams.get('start'),
  };

  const SEARCH_BOOK_URL = `/api/books/getSearchBooks?searchKeyword=${queryObject.searchKeyword}&queryType=${queryObject.queryType}&searchTarget=${queryObject.searchTarget}&start=${queryObject.start}`;

  const handleSearch = () => {
    fetch(SEARCH_BOOK_URL)
      .then((res) => res.json())
      .then((data) => {
        setSearchLists(data.item);
        setTotalPage(Math.ceil(data.totalResults / data.maxResults));
      });
  };

  // 총페이지수 = Math.ceil(totalResults / maxResults)
  // 매 페이지마다 fetch를 요청 => start

  const renderButtons = (num: number) => {
    const page = [];
    for (let i = 1; i <= num; i++) {
      page.push(
        <Link
          key={i}
          className='px-2 border-2'
          href={`/search?searchKeyword=${queryObject.searchKeyword}&queryType=${queryObject.queryType}&searchTarget=${queryObject.searchTarget}&start=${i}`}
        >
          {i}
        </Link>
      );
    }
    return page;
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      {openModal ? (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
          modalContent={`검색어를 입력해주세요.`}
        />
      ) : null}

      <select onChange={(e) => setQueryType(e.target.value)}>
        <option value='title'>도서명</option>
        <option value='author'>저자</option>
      </select>

      <input
        onChange={(e) => setSearchTarget(e.target.value)}
        name='category'
        type='radio'
        value='book'
        id='book'
        checked={searchTarget === 'book'}
      />
      <label htmlFor='book'>국내도서</label>

      <input
        onChange={(e) => setSearchTarget(e.target.value)}
        name='category'
        type='radio'
        value='foreign'
        id='foreign'
        checked={searchTarget === 'foreign'}
      />
      <label htmlFor='foreign'>해외도서</label>

      <input
        type='text'
        placeholder='도서 검색'
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button
        onClick={() => {
          if (searchKeyword.length > 0) {
            window.location.href = `/search?searchKeyword=${searchKeyword}&queryType=${queryType}&searchTarget=${searchTarget}&start=1`;
          } else {
            setOpenModal(true);
          }
        }}
      >
        검색
      </button>
      <div>{`${queryObject.searchKeyword}를(을) 검색한 결과입니다.`}</div>

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
      <div>{renderButtons(totalPage)}</div>
    </div>
  );
};

export default Search;
