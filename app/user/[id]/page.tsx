'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { sessionState } from '@/store/store';
import ChangeUserImgModal from '@/components/ChangeUserImgModal';
import Modal from '@/components/Modal';

const User = (props: { params: { id: string }; searchParams: {} }) => {
  const [myReviews, setMyReviews] = useState<{ content: string; isbn: string; date: string }[]>([]);
  const [myReviewImgs, setMyReviewImgs] = useState<{ img: string; isbn: string }[]>([]);
  const [myInfo, setMyInfo] = useState<{ name: string; email: string; image: string }>();

  const [showChangeUserImgModal, setShowChangeUserImgModal] = useState(false);
  const [changeImgUrl, setChangeImgUrl] = useState('');

  const [openChangeNameWindow, setOpenChangeNameWindow] = useState(false);
  const [changeName, setChangeName] = useState('');
  const [showChangeUserNameModal, setShowChangeUserNameModal] = useState(false);

  let userId = props.params.id;
  const { id } = sessionState();

  const GET_USER_REVIEW_URL = `/api/users/getUserReview?userId=${userId}`;
  const GET_USER_INFORMATION_URL = `/api/users/getUserInfo?userId=${userId}`;
  const PATCH_USER_IMG_URL = '/api/users/patchUserImg';
  const PATCH_USER_NAME_URL = '/api/users/patchUserName';

  const getMyReviewInfo = () => {
    fetch(GET_USER_REVIEW_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyReviewImgs(data.uniqueImages);
        setMyReviews(data.userReviews);
      })
      .catch((err) => console.log(err));
  };

  const getUserInfo = () => {
    fetch(GET_USER_INFORMATION_URL)
      .then((res) => res.json())
      .then((data) => setMyInfo(data))
      .catch((err) => console.log(err));
  };

  const patchUserImg = () => {
    fetch(PATCH_USER_IMG_URL, {
      method: 'PATCH',
      body: changeImgUrl,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const patchUserName = () => {
    fetch(PATCH_USER_NAME_URL, {
      method: 'PATCH',
      body: changeName,
    })
      .then((res) => setShowChangeUserNameModal(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyReviewInfo();
    getUserInfo();
  }, []);

  return (
    <>
      {showChangeUserImgModal ? (
        <ChangeUserImgModal
          onClose={() => setShowChangeUserImgModal(false)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeImgUrl(e.target.value)}
          onClick={patchUserImg}
        />
      ) : null}
      {showChangeUserNameModal ? (
        <Modal
          onClose={() => {
            setShowChangeUserNameModal(false);
            window.location.reload();
          }}
          modalContent={`이름이 ${changeName}(으)로 변경되었습니다`}
        />
      ) : null}

      <div>
        {myInfo === undefined ? (
          <div>로딩중</div>
        ) : (
          <>
            {id !== userId ? (
              <Link href={myInfo.image} target='_blank'>
                <img
                  className='rounded-[50%]'
                  src={myInfo.image}
                  width={45.6}
                  height={43.9}
                  alt={myInfo.name}
                />
              </Link>
            ) : (
              <img
                className='rounded-[50%]'
                src={myInfo.image}
                width={45.6}
                height={43.9}
                alt={myInfo.name}
                onClick={() => setShowChangeUserImgModal(true)}
              />
            )}

            <div>
              {myInfo.name}
              {openChangeNameWindow ? (
                <>
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setChangeName(e.target.value)
                    }
                    defaultValue={myInfo.name}
                  />
                  <button onClick={patchUserName}>수정하기</button>
                  <button onClick={() => setOpenChangeNameWindow(false)}>취소</button>
                </>
              ) : id !== userId ? null : (
                <button onClick={() => setOpenChangeNameWindow(true)}>✏️</button>
              )}
            </div>
            <div>{myInfo.email}</div>
            <div>포인트 : {myReviews.length * 3}점</div>
          </>
        )}

        {id === userId ? (
          <>
            <button className='px-3 py-2 mr-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'>
              비밀번호변경
            </button>
            <button className='px-3 py-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'>
              회원탈퇴
            </button>
          </>
        ) : null}
      </div>

      <div>읽은 책 이미지</div>
      <div className='flex'>
        {myReviewImgs.map((img, i) => {
          return (
            <Link key={i} href={`/book/${img.isbn}`}>
              <img src={img.img} />
            </Link>
          );
        })}
      </div>
      <div className='w-1/2'>
        <div className='flex items-center justify-between'>
          <span className='text-2xl'>작성한 리뷰</span>
          {myReviews.length > 0 ? (
            <Link className='text-gray-400' href={`user/review/${userId}`}>
              더보기
            </Link>
          ) : null}
        </div>
        {myReviews.length > 0 ? (
          <div className='flex flex-col'>
            {myReviews
              .map((review, i) => {
                return (
                  <Link className='my-1 border-b-2' key={i} href={`/book/${review.isbn}`}>
                    <div className='flex justify-between hover:text-red-200'>
                      <span className='truncate'>{review.content}</span>
                      <span className='text-gray-400 min-w-[84px]'>{review.date}</span>
                    </div>
                  </Link>
                );
              })
              .slice(0, 5)}
          </div>
        ) : (
          <div>작성한 리뷰가 없어요</div>
        )}
      </div>
    </>
  );
};

export default User;
