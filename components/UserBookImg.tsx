import { UserBookImgType } from '@/types/interface';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

const UserBookImg = ({ lists }: { lists: UserBookImgType[] }) => {
  return (
    <div className='w-full max-w-screen-xl'>
      <Swiper
        spaceBetween={15}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {lists.map((list, i) => {
          return (
            <SwiperSlide key={i} className='flex flex-col items-center'>
              <Link href={`/book/${list.isbn}`} className='h-[300px] flex items-center'>
                <div className='relative'>
                  <img src={list.img} className='shadow-lg' />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default UserBookImg;
