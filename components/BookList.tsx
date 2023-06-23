import { BookListOnMainType } from '@/types/interface';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

const BookList = ({ lists }: { lists: BookListOnMainType[] }) => {
  return (
    <div className='max-w-screen-xl w-full mb-24 bg-gray-100 pb-6 rounded'>
      <Swiper
        spaceBetween={30}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          500: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          700: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          950: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1280: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
        className='px-16'
      >
        {lists.map((list, i) => {
          return (
            <SwiperSlide key={i} className='flex flex-col items-center'>
              <Link href={`/book/${list.isbn}`} className='h-[300px] flex items-center'>
                <img src={list.coverLargeUrl} />
              </Link>
              <div className='w-full truncate'>{list.title}</div>
              <div className='w-full text-sm text-gray-500'>{list.author}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BookList;
