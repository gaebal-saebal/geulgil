'use client';
import React, { useEffect, useState } from 'react';
import { BookDetailType } from '@/types/interface';

const Book = (props: { params: { id: string }; searchParams: {} }) => {
  const [lists, setLists] = useState<BookDetailType[]>([]);
  const id = props.params.id;

  useEffect(() => {
    fetch(`/api/books/getBookDetails?isbn=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLists(data.item);
      });
  }, []);

  if (lists.length > 0) {
    return (
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
    );
  } else {
    return <div>로딩중 기다려주세요</div>;
  }
};

export default Book;
