'use client';
import React, { useEffect, useState } from 'react';
import { BookDetailType, ReviewsType } from '@/types/interface';
import { sessionState } from '@/store/store';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Book = (props: { params: { id: string }; searchParams: { searchTarget: string } }) => {
  const [lists, setLists] = useState<BookDetailType[]>([]);
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState('1');
  const [reviewOpen, setReivewOpen] = useState(false);

  const isbn = props.params.id;
  const searchTarget = props.searchParams.searchTarget;
  const { id } = sessionState();

  const GET_REVIEW_URL = `/api/books/getReviews?isbn=${isbn}`;
  const GET_BOOK_INFO_URL = `/api/books/getBookDetails?searchTarget=${searchTarget}&isbn=${isbn}`;
  const POST_REVIEW_LIKE_URL = `/api/reviews/likeReview`;

  const priceHandler = (num: number) => {
    let result = '';
    let stringify = String(num);
    if (stringify.length === 6) {
      result = `${stringify.substring(0, 3)},${stringify.substring(3, 6)}`;
      return result;
    } else if (stringify.length === 5) {
      result = `${stringify.substring(0, 2)},${stringify.substring(2, 5)}`;
      return result;
    } else {
      result = `${stringify.substring(0, 1)},${stringify.substring(1, 4)}`;
      return result;
    }
  };

  const getReviews = () => {
    fetch(GET_REVIEW_URL)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  };

  const getBookDetails = () => {
    fetch(GET_BOOK_INFO_URL)
      .then((res) => res.json())
      .then((data) => {
        setLists(data.item);
      });
  };

  const handleLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (id !== '') {
      const target = e.target as HTMLButtonElement;
      // 로그인 상태때 클릭하면 서버에 fetch 요청 보내기(보낼때 body에 reviewId, userId 같이 보내기)
      fetch(POST_REVIEW_LIKE_URL, {
        method: 'POST',
        body: JSON.stringify({ userId: id, reviewId: target.name }),
      })
        .then((res) => res.json())
        .then((data) => {
          //클라이언트에서는 화면에 렌더링된 좋아요를 받은 response(likers.length)로 바꿉니다.
          //@ts-ignore
          e.target.parentElement.children[0].childNodes[0].data = data;
        });
    }
    // 클릭했을때 로그인 되어 있지 않으면 로그인 페이지로 이동
    else signIn();
  };

  useEffect(() => {
    getBookDetails();
    getReviews();
  }, []);

  if (lists.length > 0) {
    return (
      <div className='flex justify-center w-full'>
        <div className='flex flex-col mt-6 max-w-screen-xl items-center mx-6 h-full w-full'>
          <div className='flex flex-col w-full h-full md:flex-row'>
            <div className='w-full mr-6 flex-center flex-col md:w-1/3 md:h-1/3 md:mb-0 mb-10'>
              <img src={lists[0].coverLargeUrl} alt='book-cover' className='shadow-xl mb-3' />
              <span>{`${String(lists[0].pubDate).substring(0, 4)}. ${String(
                lists[0].pubDate
              ).substring(4, 6)}. ${String(lists[0].pubDate).substring(6, 8)}. 출간`}</span>
            </div>
            <div className='h-2/3 w-full md:h-full md:w-2/3'>
              <div className='w-full flex flex-col items-start h-1/3 mb-3'>
                <div className='text-gray-500'>{lists[0].categoryName}</div>
                <div className='flex'>
                  <h1 className='text-2xl'>{lists[0].title}</h1>
                  <span className='text-gray-500 ml-2'>{lists[0].author}</span>
                </div>
                <span>{lists[0].publisher}</span>
                <div>정가 : {priceHandler(lists[0].priceStandard)}원</div>
              </div>
              <div className='bg-white border-orange-300 border-2 rounded-lg flex px-6 py-2 h-1/2 overflow-scroll scrollbar-hidden '>
                {lists[0].description}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setReivewOpen(!reviewOpen);
            }}
            className='mt-10 text-lg bg-orange-300 px-6 py-3 rounded-lg text-white hover:bg-orange-500'
          >
            {reviewOpen ? '닫기' : '리뷰 작성'}
          </button>
          {reviewOpen ? (
            <div className='flex justify-center w-full items-center h-52 mt-6 '>
              <div className='hidden w-1/3 mr-6 md:flex'></div>
              <div className='w-full md:w-2/3 h-full flex-center bg-gray-100 p-6 rounded-lg'>
                <select
                  name='별점'
                  onChange={(e) => {
                    setRate(e.target.value);
                  }}
                  className='rounded-l-lg h-full border-2 border-orange-300 border-r-0 focus:outline-none'
                >
                  <option value='1'>⭑⭒⭒⭒⭒</option>
                  <option value='2'>⭑⭑⭒⭒⭒</option>
                  <option value='3'>⭑⭑⭑⭒⭒</option>
                  <option value='4'>⭑⭑⭑⭑⭒</option>
                  <option value='5'>⭑⭑⭑⭑⭑</option>
                </select>
                <textarea
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  className='mr-6 resize-none rounded-r-lg w-2/3 h-full p-2 focus:outline-none border-orange-300 border-2 border-l-0'
                />

                <button
                  onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                    await fetch('/api/reviews/createReview', {
                      method: 'POST',
                      body: JSON.stringify({ rate, content, isbn }),
                    })
                      .then((res) => res.json())
                      .then((data) => console.log(data));
                    getReviews();
                    //@ts-ignore
                    e.target.parentElement.children[1].value = '';
                    setContent('');
                  }}
                  className=' bg-orange-300 text-white font-bold rounded-lg py-3 w-16 hover:bg-orange-500 '
                >
                  작성
                </button>
              </div>
            </div>
          ) : null}

          <div className='flex w-full'>
            <div className='w-1/3 mr-6 md:flex hidden'></div>
            <div className='w-full md:w-2/3  px-5  bg-white rounded-lg mt-6 mb-6 py-10'>
              <div className='flex items-center justify-between mb-5 '>
                <span className='text-3xl'>리뷰목록</span>

                {reviews.length > 0 ? (
                  <Link className='text-gray-400' href={`book/review/${isbn}`}>
                    더보기
                  </Link>
                ) : null}
              </div>
              {reviews.length > 0 ? (
                <div className='flex flex-col'>
                  {reviews
                    .map((review, i) => {
                      return (
                        <div className='my-1 border-b-2 border-orange-200' key={i}>
                          <div className='flex flex-col justify-between hover:text-orange-300 md:flex-row'>
                            <div className='w-full flex md:w-[50%]'>
                              <span className='w-[40%]'>
                                {review.rate === '1'
                                  ? '⭑⭒⭒⭒⭒'
                                  : review.rate === '2'
                                  ? '⭑⭑⭒⭒⭒'
                                  : review.rate === '3'
                                  ? '⭑⭑⭑⭒⭒'
                                  : review.rate === '4'
                                  ? '⭑⭑⭑⭑⭒'
                                  : '⭑⭑⭑⭑⭑'}
                              </span>
                              <span className='truncate w-[60%]'>{review.content}</span>
                            </div>
                            <div className='w-full flex md:w-[50%]'>
                              <Link
                                href={`/user/${review.userId}`}
                                className='w-[40%] truncate text-left md:text-center'
                              >
                                {review.name}
                              </Link>
                              <span className='text-gray-400 w-[40%] text-left md:text-center'>
                                {review.date}
                              </span>
                              <div className='w-[20%] flex justify-end'>
                                <span className='mr-2'>{review.likes}</span>
                                <button name={review._id} onClick={(e) => handleLikes(e)}>
                                  👍
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    .slice(0, 5)}
                </div>
              ) : (
                <div className='mb-6'>작성한 리뷰가 없어요</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>로딩중 기다려주세요</div>;
  }
};

export default Book;
