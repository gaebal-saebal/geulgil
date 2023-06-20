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
      <div className='w-1/2'>
        <div className='flex items-center justify-between'>
          <span className='text-2xl'>작성한 리뷰</span>
          <Link className='text-gray-400' href={`user/review/${userId}`}>
            더보기
          </Link>
        </div>
        <div className='flex flex-col'>
          {myReviews
            .map((review, i) => {
              return (
                <Link className='my-1 border-b-2' key={i} href={`/book/${review.isbn}`}>
                  <div className='flex justify-between hover:text-red-200'>
                    <span className='truncate'>{review.content}</span>
                    <span className='text-gray-400 min-w-[84px]'>{review.date}</span>
                  </div>
                </Link>
              );
            })
            .slice(0, 5)}
        </div>
      </div>
    </>
  );
};

export default User;
