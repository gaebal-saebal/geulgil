'use client';
import React, { useEffect, useState } from 'react';
import { BookDetailType, ReviewsType } from '@/types/interface';

const Book = (props: { params: { id: string }; searchParams: {} }) => {
  const [lists, setLists] = useState<BookDetailType[]>([]);
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState('1');
  const id = props.params.id;

  const getReviews = () => {
    fetch(`/api/books/getReviews?isbn=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  };

  useEffect(() => {
    fetch(`/api/books/getBookDetails?isbn=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLists(data.item);
      });
  }, []);

  useEffect(() => {
    getReviews();
  }, []);

  if (lists.length > 0) {
    return (
      <div>
        <div>
          <div>{lists[0].categoryName}</div>
          <img src={lists[0].coverLargeUrl} alt='book-cover' />
          <h1>{lists[0].title}</h1>
          <span>{lists[0].author}</span>
          <span>{lists[0].publisher}</span>
          <span>{lists[0].pubDate}</span>
          <div>정가 : {lists[0].priceStandard}원</div>
          <div>{lists[0].description}</div>
        </div>
        <div>
          <select
            name='별점'
            onChange={(e) => {
              setRate(e.target.value);
            }}
          >
            <option value='1'>1점</option>
            <option value='2'>2점</option>
            <option value='3'>3점</option>
            <option value='4'>4점</option>
            <option value='5'>5점</option>
          </select>
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div>좋아요</div>
          <button
            onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              await fetch('/api/reviews/createReview', {
                method: 'POST',
                body: JSON.stringify({ rate, content, id }),
              })
                .then((res) => res.json())
                .then((data) => console.log(data));
              getReviews();
              //@ts-ignore
              e.target.parentElement.children[1].value = '';
              setContent('');
            }}
          >
            리뷰 올리기
          </button>
        </div>
        <div>
          {reviews.map((review, i) => {
            return (
              <div key={i}>
                <span>★:{review.rate}</span>
                <span>{review.content}</span>
                <span>{review.name}</span>
                <span>{review.date}</span>
                <span>{review.likes}</span>
                👍
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>로딩중 기다려주세요</div>;
  }
};

export default Book;
