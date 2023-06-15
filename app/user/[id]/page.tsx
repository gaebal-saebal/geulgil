'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const User = (props: { params: { id: string }; searchParams: {} }) => {
  let userId = props.params.id;
  const [myReviews, setMyReviews] = useState<{ content: string; isbn: string }[]>([]);
  const [myReviewImgs, setMyReviewImgs] = useState<{ img: string; isbn: string }[]>([]);
  // 읽은책리스트
  // 작성한리뷰
  // 리뷰 작성하나당 1점이런식으로 점수도?
  // 회원정보수정
  // 회원탈퇴

  useEffect(() => {
    getMyReviewInfo();
  }, []);

  const getMyReviewInfo = () => {
    fetch(`/api/users/getUserInfo?userId=${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyReviewImgs(data.myReviewImg);
        setMyReviews(data.userReviews);
      })
      .catch((err) => console.log(err));
  };

  console.log(myReviews);
  console.log(myReviewImgs);
  return (
    <>
      <div>읽은 책 이미지</div>
      {myReviewImgs.map((img, i) => {
        return (
          <Link key={i} href={`/book/${img.isbn}`}>
            <img src={img.img} />
          </Link>
        );
      })}
      <div>작성한리뷰</div>
      {myReviews.map((review, i) => {
        return (
          <Link key={i} href={`/book/${review.isbn}`}>
            <div>{review.content}</div>
          </Link>
        );
      })}
    </>
  );
};

export default User;
