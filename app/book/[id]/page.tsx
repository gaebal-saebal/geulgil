'use client';
import React, { useEffect, useState } from 'react';
import { BookDetailType, ReviewsType } from '@/types/interface';
import { sessionState } from '@/store/store';
import { signIn } from 'next-auth/react';

const Book = (props: { params: { id: string }; searchParams: {} }) => {
  const [lists, setLists] = useState<BookDetailType[]>([]);
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [content, setContent] = useState('');
  const [rate, setRate] = useState('1');
  const isbn = props.params.id;

  const { id } = sessionState();

  const GET_REVIEW_URL = `/api/books/getReviews?isbn=${isbn}`;
  const GET_BOOK_INFO_URL = `/api/books/getBookDetails?isbn=${isbn}`;
  const POST_REVIEW_LIKE_URL = `/api/reviews/likeReview`;

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
          e.target.parentElement.children[4].childNodes[0].data = data;
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
                body: JSON.stringify({ rate, content, isbn }),
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
                <button name={review._id} onClick={(e) => handleLikes(e)}>
                  👍
                </button>
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
