'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { sessionState } from '@/store/store';
import Image from 'next/image';

const User = (props: { params: { id: string }; searchParams: {} }) => {
  const [myReviews, setMyReviews] = useState<{ content: string; isbn: string; date: string }[]>([]);
  const [myReviewImgs, setMyReviewImgs] = useState<{ img: string; isbn: string }[]>([]);
  const [myInfo, setMyInfo] = useState<{ name: string; email: string; image: string }>();

  let userId = props.params.id;
  const { id } = sessionState();

  const GET_USER_REVIEW_URL = `/api/users/getUserReview?userId=${userId}`;
  const GET_USER_INFORMATION_URL = `/api/users/getUserInfo?userId=${userId}`;

  const getMyReviewInfo = () => {
    fetch(GET_USER_REVIEW_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyReviewImgs(data.uniqueImages);
        setMyReviews(data.userReviews);
      })
      .catch((err) => console.log(err));
  };

  const getUserInfo = () => {
    fetch(GET_USER_INFORMATION_URL)
      .then((res) => res.json())
      .then((data) => setMyInfo(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyReviewInfo();
    getUserInfo();
  }, []);

  return (
    <>
      <div>
        {myInfo === undefined ? (
          <div>로딩중</div>
        ) : (
          <>
            <Image
              className='rounded-[50%]'
              src={myInfo.image}
              width={45.6}
              height={43.9}
              alt={myInfo.name}
              priority
            />
            <div>{myInfo.name}</div>
            <div>{myInfo.email}</div>
            <div>포인트 : {myReviews.length * 3}점</div>
          </>
        )}

        {id === userId ? (
          <>
            <button>수정버튼</button>
            <button>회원탈퇴버튼</button>
          </>
        ) : null}
      </div>

      <div>읽은 책 이미지</div>
      <div className='flex'>
        {myReviewImgs.map((img, i) => {
          return (
            <Link key={i} href={`/book/${img.isbn}`}>
              <img src={img.img} />
            </Link>
          );
        })}
      </div>
      <div>작성한리뷰</div>
      {myReviews.map((review, i) => {
        return (
          <Link key={i} href={`/book/${review.isbn}`}>
            <div>
              {review.content} // {review.date}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default User;
