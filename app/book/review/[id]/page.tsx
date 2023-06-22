'use client';
import { sessionState } from '@/store/store';
import { BookDetailType, ReviewsType } from '@/types/interface';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Review = (props: { params: { id: string } }) => {
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [lists, setLists] = useState<BookDetailType[]>([]);
  const { id } = sessionState();

  let isbn = props.params.id;
  const GET_REVIEW_URL = `/api/books/getReviews?isbn=${isbn}`;
  const POST_REVIEW_LIKE_URL = `/api/reviews/likeReview`;
  const GET_BOOK_INFO_URL = `/api/books/getBookDetails?isbn=${isbn}`;

  const getReview = () => {
    fetch(GET_REVIEW_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => console.log(err));
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
          e.target.parentElement.childNodes[0].childNodes[0].data = data;
        });
    }
    // 클릭했을때 로그인 되어 있지 않으면 로그인 페이지로 이동
    else signIn();
  };

  const star = (str: string) => {
    let score = Number(str);
    let result = '';
    for (let i = 0; i < score; i++) {
      result = '⭐️' + result;
    }
    return result;
  };

  useEffect(() => {
    getReview();
    getBookDetails();
  }, []);

  return (
    <>
      {lists.length > 0 ? (
        <div className='flex flex-col items-center'>
          <img src={lists[0].coverLargeUrl} alt='book-cover' className='border-2' />
          <div>{lists[0].title}</div>
        </div>
      ) : null}
      <div className='flex flex-col items-center'>
        {reviews.map((review, i) => {
          return (
            <div className='flex w-full p-3 my-2 justify-center' key={i}>
              <div className='flex flex-col justify-between w-3/4 p-3 border-2 rounded-xl hover:bg-gray-100'>
                <span>{star(review.rate)}</span>
                <div>{review.content}</div>
                <div className='flex justify-end'>
                  <span>{review.likes}</span>
                  <button name={review._id} onClick={(e) => handleLikes(e)}>
                    👍
                  </button>
                </div>
                <div className='flex justify-between'>
                  <Link href={`/user/${review.userId}`}>{review.name}</Link>
                  <div className='flex justify-end text-gray-400'>{review.date}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Review;
