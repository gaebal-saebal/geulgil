'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Review = (props: { params: { id: string } }) => {
  const [myReviews, setMyReviews] = useState<{ content: string; isbn: string; date: string }[]>([]);
  const [myReviewImgs, setMyReviewImgs] = useState<{ img: string; isbn: string }[]>([]);

  let userId = props.params.id;

  const GET_USER_REVIEW_URL = `/api/users/getUserReview?userId=${userId}`;

  const getMyReviewInfo = () => {
    fetch(GET_USER_REVIEW_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyReviews(data.userReviews);
        setMyReviewImgs(data.matchedImages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyReviewInfo();
  }, []);

  return (
    <>
      <div className='flex flex-col items-center'>
        {myReviews.map((review, i) => {
          return (
            <Link
              className='flex w-3/4 p-3 my-2 hover:bg-gray-100'
              key={i}
              href={`/book/${review.isbn}`}
            >
              <img
                className='object-contain w-1/4 mr-4 rounded-xl'
                src={`${myReviewImgs[i].img}`}
                alt='book-image'
              />
              <div className='flex flex-col justify-between w-3/4 p-3 border-2 rounded-xl'>
                <div>{review.content}</div>
                <div className='flex justify-end text-gray-400'>{review.date}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Review;
