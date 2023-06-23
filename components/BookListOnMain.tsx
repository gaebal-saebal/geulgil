'use client';
import React, { useEffect, useState } from 'react';
import { BookListOnMainType } from '@/types/interface';
import BookList from './BookList';

const BookListOnMain = () => {
  const [bestSellers, setBestSellers] = useState<BookListOnMainType[]>([]);
  const [newArrivals, setNewArrivals] = useState<BookListOnMainType[]>([]);
  const [fBestSellers, setFBestSellers] = useState<BookListOnMainType[]>([]);
  const [fNewArrivals, setFNewArrivals] = useState<BookListOnMainType[]>([]);

  const GET_BEST_SELLER_URL = '/api/books/getBestSeller?categoryId=100';
  const GET_NEW_ARRIVAL_URL = '/api/books/getNewArrival?categoryId=100';
  const GET_F_BEST_SELLER_URL = '/api/books/getBestSeller?categoryId=200';
  const GET_F_NEW_ARRIVAL_URL = '/api/books/getNewArrival?categoryId=200';

  const getLists = (
    URL: string,
    setState: React.Dispatch<React.SetStateAction<BookListOnMainType[]>>
  ) => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setState(data.item);
      });
  };

  useEffect(() => {
    getLists(GET_BEST_SELLER_URL, setBestSellers);
    getLists(GET_NEW_ARRIVAL_URL, setNewArrivals);
    getLists(GET_F_BEST_SELLER_URL, setFBestSellers);
    getLists(GET_F_NEW_ARRIVAL_URL, setFNewArrivals);
  }, []);

  return (
    <div className='mt-16 max-w-screen-xl w-full'>
      <h1 className='text-3xl  mb-2'>베스트셀러</h1>
      <h3 className='text-gray-500 mb-5'>
        인터넷에서 판매되는 상품의 지난 하루간 가장 많이 판매된 순위입니다.
      </h3>
      <BookList lists={bestSellers} />
      <h1 className='text-3xl mb-2'>신간리스트</h1>
      <h3 className='text-gray-500 mb-5'>
        이 주에 새롭게 등록된 신상품 중 글길이 추천하는 리스트입니다.
      </h3>
      <BookList lists={newArrivals} />
      <h1 className='text-3xl mb-2'>해외 베스트셀러</h1>
      <h3 className='text-gray-500 mb-5'>
        인터넷에서 판매되는 상품의 지난 하루간 가장 많이 판매된 순위입니다.
      </h3>
      <BookList lists={fBestSellers} />
      <h1 className='text-3xl mb-2'>해외 신간리스트</h1>
      <h3 className='text-gray-500 mb-5'>
        이 주에 새롭게 등록된 신상품 중 글길이 추천하는 리스트입니다.
      </h3>
      <BookList lists={fNewArrivals} />
    </div>
  );
};

export default BookListOnMain;
