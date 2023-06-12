'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const Book = () => {
  const params = useParams();
  return <div>북디테일 페이지</div>;
};

export default Book;
