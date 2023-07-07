'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { sessionState } from '@/store/store';
import ChangeUserImgModal from '@/components/ChangeUserImgModal';
import Modal from '@/components/Modal';
import ConfirmModal from '@/components/ConfirmModal';
import { signOut } from 'next-auth/react';
import UserBookImg from '@/components/UserBookImg';

const User = (props: { params: { id: string }; searchParams: {} }) => {
  const [myReviews, setMyReviews] = useState<{ content: string; isbn: string; date: string }[]>([]);
  const [myReviewImgs, setMyReviewImgs] = useState<
    { img: string; isbn: string; categoryName: string }[]
  >([]);
  const [myInfo, setMyInfo] = useState<{ name: string; email: string; image: string }>();

  const [showChangeUserImgModal, setShowChangeUserImgModal] = useState(false);
  const [changeImgUrl, setChangeImgUrl] = useState('');

  const [openChangeNameWindow, setOpenChangeNameWindow] = useState(false);
  const [openChangePasswordWindow, setOpenChangePasswordWindow] = useState(false);
  const [changeName, setChangeName] = useState('');
  const [changePassword, setChangePassword] = useState('a');
  const [showChangeUserNameModal, setShowChangeUserNameModal] = useState(false);
  const [showChangeUserPasswordModal, setShowChangeUserPasswordModal] = useState(false);
  const [showChangeUserPasswordValidationModal, setShowChangeUserPasswordValidationModal] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  let userId = props.params.id;

  const { id } = sessionState();

  const GET_USER_REVIEW_URL = `/api/users/getUserReview?userId=${userId}`;
  const GET_USER_INFORMATION_URL = `/api/users/getUserInfo?userId=${userId}`;
  const PATCH_USER_IMG_URL = '/api/users/patchUserImg';
  const PATCH_USER_NAME_URL = '/api/users/patchUserName';
  const PATCH_USER_PASSWORD_URL = '/api/users/patchUserPassword';
  const DELETE_USER_INFO_URL = `/api/users/deleteUserInfo?userId=${userId}`;

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
  const patchUserPassword = () => {
    if (changePassword.length >= 6) {
      fetch(PATCH_USER_PASSWORD_URL, {
        method: 'PATCH',
        body: changePassword,
      })
        .then((res) => setShowChangeUserPasswordModal(true))
        .catch((err) => console.log(err));
    } else {
      setShowChangeUserPasswordValidationModal(true);
    }
  };

  const deleteUserInfo = () => {
    fetch(DELETE_USER_INFO_URL, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => signOut({ callbackUrl: '/' }));
  };

  useEffect(() => {
    getMyReviewInfo();
    getUserInfo();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='w-1/2 my-24 max-w-[768px]'>
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
        {showChangeUserPasswordModal ? (
          <Modal
            onClose={() => {
              setShowChangeUserPasswordModal(false);
              window.location.reload();
            }}
            modalContent={'비밀번호가 변경되었습니다'}
          />
        ) : null}
        {showChangeUserPasswordValidationModal ? (
          <Modal
            onClose={() => {
              setShowChangeUserPasswordValidationModal(false);
            }}
            modalContent={'비밀번호를 6자 이상 입력해주세요'}
          />
        ) : null}
        {showConfirmModal ? (
          <ConfirmModal onClose={() => setShowConfirmModal(false)} onClick={deleteUserInfo} />
        ) : null}

        <div className='flex flex-col'>
          {myInfo === undefined ? (
            <div>로딩중</div>
          ) : (
            <div className='flex flex-col items-center h-full px-2 py-10 bg-white rounded-lg shadow-xl md:flex-row'>
              {id !== userId ? (
                <Link href={myInfo.image} target='_blank' className='w-1/3 flex-center'>
                  <img className='rounded-[50%]' src={myInfo.image} alt={myInfo.name} />
                </Link>
              ) : (
                <div className='w-1/3 flex-center'>
                  <img
                    className='rounded-[50%]'
                    src={myInfo.image}
                    alt={myInfo.name}
                    onClick={() => setShowChangeUserImgModal(true)}
                  />
                </div>
              )}
              <div className='flex flex-col justify-center w-2/3 ml-12'>
                <div className='flex flex-col items-start mb-5 '>
                  <span className='text-4xl'>{myInfo.name}</span>
                  <div className='flex justify-between w-full'>
                    {openChangeNameWindow ? (
                      <div className='p-5 bg-white border-2 border-orange-300 rounded-lg shadow-lg'>
                        <div>닉네임 변경</div>
                        <div className='flex flex-col w-full'>
                          <input
                            className='w-full h-10 pl-2 mb-2 border-2 border-orange-300 rounded-lg focus:outline-none'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setChangeName(e.target.value)
                            }
                            defaultValue={myInfo.name}
                          />
                          <div className='flex w-full'>
                            <button
                              className='p-2 px-5 py-2 mr-2 text-sm text-white bg-orange-300 rounded-lg hover:bg-orange-500'
                              onClick={patchUserName}
                            >
                              수정
                            </button>
                            <button
                              className='px-5 py-2 text-sm text-white bg-orange-300 rounded-lg hover:bg-orange-500'
                              onClick={() => setOpenChangeNameWindow(false)}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : id !== userId ? null : (
                      <button className='' onClick={() => setOpenChangeNameWindow(true)}>
                        ✏️
                      </button>
                    )}
                  </div>
                </div>
                <div className='text-xl '>{myInfo.email}</div>
                <div className='text-xl '>포인트 : {myReviews.length * 3}점</div>
                {id === userId ? (
                  <>
                    {openChangePasswordWindow ? (
                      <div className='p-5 bg-white border-2 border-orange-300 rounded-lg shadow-lg'>
                        <div>비밀번호 변경</div>
                        <span className='relative w-full'>
                          <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setChangePassword(e.target.value)
                            }
                            type={showPassword ? 'text' : 'password'}
                            className='w-full h-10 pl-2 border-2 border-orange-300 rounded-lg focus:outline-none'
                          />
                          <span
                            className='absolute bottom-0 cursor-pointer right-3'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? '🔒' : '👀'}
                          </span>
                        </span>
                        <div className='mt-2'>
                          <button
                            className='px-5 py-2 mr-2 text-sm text-white bg-orange-300 rounded-lg hover:bg-orange-500'
                            onClick={patchUserPassword}
                          >
                            수정
                          </button>
                          <button
                            className='px-5 py-2 text-sm text-white bg-orange-300 rounded-lg hover:bg-orange-500'
                            onClick={() => setOpenChangePasswordWindow(false)}
                          >
                            취소
                          </button>
                        </div>
                        {changePassword === '' && (
                          <p className='text-red-500'>비밀번호를 입력해주세요.</p>
                        )}
                      </div>
                    ) : id !== userId ? null : (
                      <button
                        className='w-32 px-3 py-2 mr-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'
                        onClick={() => setOpenChangePasswordWindow(true)}
                      >
                        비밀번호 변경
                      </button>
                    )}

                    <button
                      className='w-32 px-3 py-2 mt-2 text-white bg-orange-300 rounded-md hover:bg-orange-500'
                      onClick={() => setShowConfirmModal(true)}
                    >
                      회원탈퇴
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {/* swiper */}
        <div className='flex mt-12 mb-6'>
          <UserBookImg lists={myReviewImgs} />
        </div>

        {/* 작성한 리뷰 */}
        <div className='w-full px-5 py-10 bg-white rounded-lg shadow-xl'>
          <div className='flex items-center justify-between mb-5'>
            <span className='text-3xl'>작성한 리뷰</span>
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
                    <Link
                      className='my-1 border-b-2 border-orange-200'
                      key={i}
                      href={`/book/${review.isbn}`}
                    >
                      <div className='flex justify-between hover:text-orange-300'>
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
      </div>
    </div>
  );
};

export default User;
