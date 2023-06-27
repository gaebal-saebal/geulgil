'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookListOnMainType } from '@/types/interface';
import Modal from '@/components/Modal';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [queryType, setQueryType] = useState('title');
  const [searchTarget, setSearchTarget] = useState('book');
  const [queryObject, setQueryObject] = useState<{
    searchKeyword: string | null;
    queryType: string | null;
    searchTarget: string | null;
    start: string | null;
  }>({ searchKeyword: '', queryType: '', searchTarget: '', start: '' });

  const [searchLists, setSearchLists] = useState<BookListOnMainType[]>([]);

  const [totalPage, setTotalPage] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const SEARCH_BOOK_URL = `/api/books/getSearchBooks?searchKeyword=${queryObject.searchKeyword}&queryType=${queryObject.queryType}&searchTarget=${queryObject.searchTarget}&start=${queryObject.start}`;

  const handleSearch = () => {
    fetch(SEARCH_BOOK_URL, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
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

  const changeCategory = (name: string) => {
    if (name === '외국도서') {
      return 'foreign';
    } else {
      return 'book';
    }
  };
  const originalCategory = (name: string | null) => {
    if (name === 'foreign') {
      return '외국도서';
    } else {
      return '국내도서';
    }
  };
  const originalQueryType = (name: string | null) => {
    if (name === 'title') {
      return '도서명';
    } else {
      return '저자';
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('searchKeyword') !== null) {
      const obj: {
        searchKeyword: string | null;
        queryType: string | null;
        searchTarget: string | null;
        start: string | null;
      } = {
        searchKeyword: urlParams.get('searchKeyword'),
        queryType: urlParams.get('queryType'),
        searchTarget: urlParams.get('searchTarget'),
        start: urlParams.get('start'),
      };
      setQueryObject(obj);
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [queryObject]);
  console.log(searchTarget);
  return (
    <div className='flex flex-col items-center'>
      {openModal ? (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
          modalContent={`검색어를 입력해주세요.`}
        />
      ) : null}
      <div className='flex-center w-full'>
        <div className='flex-center w-2/3 h-32 mt-12 bg-gray-100 rounded-lg shadow-md p-2'>
          <div className='flex flex-col w-32 h-full mr-2'>
            <span
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                const target = e.target as HTMLSpanElement;
                setQueryType(target.id);
              }}
              id='title'
              className={`h-1/2 flex-center ${
                queryType === 'title' ? 'bg-orange-300 text-white' : null
              } cursor-pointer duration-300 rounded-lg`}
            >
              도서명
            </span>
            <span
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                const target = e.target as HTMLSpanElement;
                setQueryType(target.id);
              }}
              id='author'
              className={`h-1/2 flex-center ${
                queryType === 'author' ? 'bg-orange-300 text-white' : null
              } cursor-pointer duration-300 rounded-lg`}
            >
              저자
            </span>
          </div>
          <div className='flex flex-col w-32 h-full mr-2'>
            <span
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                const target = e.target as HTMLSpanElement;
                setSearchTarget(target.id);
              }}
              id='book'
              className={`h-1/2 flex-center ${
                searchTarget === 'book' ? 'bg-teal-500 text-white' : null
              } cursor-pointer duration-300 rounded-lg`}
            >
              국내도서
            </span>
            <span
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                const target = e.target as HTMLSpanElement;
                setSearchTarget(target.id);
              }}
              id='foreign'
              className={`h-1/2 flex-center ${
                searchTarget === 'foreign' ? 'bg-teal-500 text-white' : null
              } cursor-pointer duration-300 rounded-lg`}
            >
              해외도서
            </span>
          </div>

          <input
            type='text'
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                if (searchKeyword.length > 0) {
                  window.location.href = `/search?searchKeyword=${searchKeyword}&queryType=${queryType}&searchTarget=${searchTarget}&start=1`;
                } else {
                  setOpenModal(true);
                }
              }
            }}
            className='w-1/3 h-1/2 p-3 border-2 border-orange-300 focus:outline-none mr-3 rounded-lg'
          />
          <button
            onClick={() => {
              if (searchKeyword.length > 0) {
                window.location.href = `/search?searchKeyword=${searchKeyword}&queryType=${queryType}&searchTarget=${searchTarget}&start=1`;
              } else {
                setOpenModal(true);
              }
            }}
            className='flex-center bg-orange-300 h-1/3 py-3 w-20  text-white rounded-lg hover:bg-orange-400 active:bg-orange-500'
          >
            검색
          </button>
        </div>
      </div>
      <div className='my-20 text-3xl ml-6'>{`${originalCategory(
        queryObject.searchTarget
      )}에서 ${originalQueryType(queryObject.queryType)} "${
        queryObject.searchKeyword
      }" 를(을) 검색한 결과입니다.`}</div>

      <div className='max-w-screen-2xl'>
        <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {searchLists.map((list, i) => {
            return (
              <li key={i} className='flex flex-col p-6'>
                <Link
                  href={`/book/${list.isbn}?searchTarget=${changeCategory(list.categoryName)}`}
                  prefetch={false}
                >
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
