'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookListOnMainType } from '@/types/interface';
import Modal from '@/components/Modal';
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const searchParams = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [queryType, setQueryType] = useState('title');
  const [searchTarget, setSearchTarget] = useState('book');
  const [queryObject, setQueryObject] = useState<{
    searchKeyword: string | null | undefined;
    queryType: string | null | undefined;
    searchTarget: string | null | undefined;
    start: string | null | undefined;
  }>({
    searchKeyword: searchParams?.get('searchKeyword'),
    queryType: searchParams?.get('queryType'),
    searchTarget: searchParams?.get('searchTarget'),
    start: searchParams?.get('start'),
  });

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

  const renderButtons = (num: number, page: number) => {
    // num = totalPages ex. 3
    // page = 0 ~ Math.floor(totalPage/5) ex. 0.6 // 0(1,2,3,4,5),1(6,7,8,9,10)

    // pages === start=1~total로 이동하는 모든 버튼이 담겨져 있는 array
    const pages = [];
    for (let i = 1; i <= num; i++) {
      pages.push(
        <span
          key={i}
          className='pagination-button'
          onClick={() => {
            window.location.href = `/search?searchKeyword=${queryObject.searchKeyword}&queryType=${queryObject.queryType}&searchTarget=${queryObject.searchTarget}&start=${i}`;
          }}
        >
          {i}
        </span>
      );
    }

    const offset = page * 5; // 5개 자를거임
    let result: any[] = []; // 결과 담을 array

    if (pages.length > 0) {
      result = pages.slice(offset, offset + 5);
      // pages를 자르는데
    }
    return result;
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
    handleSearch();
  }, [queryObject]);

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
      <div className='w-full flex-center'>
        <div className='w-2/3 h-32 p-2 mt-12 bg-gray-100 rounded-lg shadow-md flex-center'>
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
            className='w-1/3 p-3 mr-3 border-2 border-orange-300 rounded-lg h-1/2 focus:outline-none'
          />
          <button
            onClick={() => {
              if (searchKeyword.length > 0) {
                window.location.href = `/search?searchKeyword=${searchKeyword}&queryType=${queryType}&searchTarget=${searchTarget}&start=1`;
              } else {
                setOpenModal(true);
              }
            }}
            className='w-20 py-3 text-white bg-orange-300 rounded-lg flex-center h-1/3 hover:bg-orange-400 active:bg-orange-500'
          >
            검색
          </button>
        </div>
      </div>
      {typeof queryObject.searchTarget === 'string' && typeof queryObject.queryType === 'string' ? (
        <div className='my-20 ml-6 text-3xl'>{`${originalCategory(
          queryObject.searchTarget
        )}에서 ${originalQueryType(queryObject.queryType)} "${
          queryObject.searchKeyword
        }" 를(을) 검색한 결과입니다.`}</div>
      ) : null}

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
      <div className='flex flex-wrap justify-center w-full max-w-screen-xl mb-10'>
        {queryObject.start !== '1' ? (
          <span
            className='pagination-button'
            onClick={() => {
              window.location.href = `/search?searchKeyword=${
                queryObject.searchKeyword
              }&queryType=${queryObject.queryType}&searchTarget=${queryObject.searchTarget}&start=${
                Number(queryObject.start) - 1
              }`;
            }}
          >
            {`<`}
          </span>
        ) : null}
        {Math.floor((Number(queryObject.start) - 1) / 5) === 0 ? null : (
          <>
            <span
              className='pagination-button'
              onClick={() => {
                window.location.href = `/search?searchKeyword=${
                  queryObject.searchKeyword
                }&queryType=${queryObject.queryType}&searchTarget=${
                  queryObject.searchTarget
                }&start=${1}`;
              }}
            >
              {`1`}
            </span>
            <span className='text-gray-500 flex-center'>···</span>
          </>
        )}
        {renderButtons(totalPage, Math.floor((Number(queryObject.start) - 1) / 5))}

        {Math.ceil(Number(queryObject.start) / 5) === Math.ceil(totalPage / 5) ? null : (
          <>
            <span className='text-gray-500 flex-center'>···</span>
            <span
              className='pagination-button'
              onClick={() => {
                window.location.href = `/search?searchKeyword=${queryObject.searchKeyword}&queryType=${queryObject.queryType}&searchTarget=${queryObject.searchTarget}&start=${totalPage}`;
              }}
            >
              {`${totalPage}`}
            </span>
          </>
        )}

        {Number(queryObject.start) !== totalPage ? (
          <span
            className='pagination-button'
            onClick={() => {
              window.location.href = `/search?searchKeyword=${
                queryObject.searchKeyword
              }&queryType=${queryObject.queryType}&searchTarget=${queryObject.searchTarget}&start=${
                Number(queryObject.start) + 1
              }`;
            }}
          >
            {`>`}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
