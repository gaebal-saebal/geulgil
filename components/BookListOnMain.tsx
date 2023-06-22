'use client';
import React, { useEffect, useState } from 'react';
import { BookListOnMainType } from '@/types/interface';
import BookList from './BookList';

const BookListOnMain = () => {
  const [bestSellers, setBestSellers] = useState<BookListOnMainType[]>([]);
  const [newArrivals, setNewArrivals] = useState<BookListOnMainType[]>([]);
  const [fBestSellers, setFBestSellers] = useState<BookListOnMainType[]>([]);
  const [fNewArrivals, setFNewArrivals] = useState<BookListOnMainType[]>([]);

  const GET_BEST_SELLER_URL = '/api/books/getBestSeller';
  const GET_NEW_ARRIVAL_URL = '/api/books/getNewArrival';
  const GET_F_BEST_SELLER_URL = '/api/books/getFBestSeller';
  const GET_F_NEW_ARRIVAL_URL = '/api/books/getFNewArrival';

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
    // getLists(GET_NEW_ARRIVAL_URL, setNewArrivals);
    // getLists(GET_F_BEST_SELLER_URL, setFBestSellers);
    // getLists(GET_F_NEW_ARRIVAL_URL, setFNewArrivals);
  }, []);

  return (
    <div>
      <h1>베스트셀러</h1>
      <BookList lists={bestSellers} />
    </div>
  );
};

export default BookListOnMain;
