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

  const handleLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    /*TODO:
      0. 클릭했을때 로그인 되어 있지 않으면 로그인 페이지로 이동
      1. 로그인 상태때 클릭하면 서버에 fetch 요청 보내기(보낼때 body에 review의 id 같이 보내기)

      2. 서버는 현재 로그인 하고 있는 사람의 id를 가져옴
      
      3-1. 2에서 받은 userId가 이미 book-likes의 likers 배열에 담겨있으면
      3-2. book-likes 객체의 likers 배열에서 해당 userId를 삭제합니다.

      4-1. 2에서 받은 userId가 book-likes의 likers 배열에 없으면
      4-2. book-likes 객체의 likers 배열에 userId를 추가합니다.
        {_id: 자동생성될거,
         reviewId: 해당 리뷰의 아이디
         likers: [...likers, 새로좋아요누른사람아이디]
        }
        이 과정에서 만약 객체가 없었다면 자동으로 객체가 생성됩니다.
      
      5. book-review-좋아요를 누른 '리뷰id'에 일치하는 리뷰에 접근합니다.
      6. 문서의 likes 값을 3의 likers.length로 수정(좋아요든 취소든 알아서 적용될거)

      7. 클라이언트에 response를 likers.length를 보냅니다.
      ---

      8. 클라이언트에서는 화면에 렌더링된 좋아요를 받은 response(likers.length)로 바꿉니다.

      + 좋아요를 눌렀다면 엄지손가락에 색깔이 채워진다거나 하는 식으로 변경합니다.
    */
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
                <button onClick={(e) => handleLikes(e)}>👍</button>
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
