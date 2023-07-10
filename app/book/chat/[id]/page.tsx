'use client';

import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Chat = (props: { params: { id: string } }) => {
  const isbn = props.params.id;
  const router = useRouter();
  const GET_VAILD_USER_URL = `/api/chat/getVaildUser?isbn=${isbn}&id=`;
  const GET_SESSION_URL = `/api/users/getUserSession`;

  const getSession = async () => {
    await fetch(GET_SESSION_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data === 'bad request') {
          signIn();
        }
        return data.user._id;
      })
      .then((userId) => isVaildUser(userId))
      .catch((err) => console.log(err));
  };

  const isVaildUser = (userId: string) => {
    fetch(GET_VAILD_USER_URL + userId)
      .then((res) => res.json())
      .then((data) => {
        if (data === '입장 가능') {
          return;
        } else {
          router.back();
        }
      });
  };

  useEffect(() => {
    getSession();
  }, []);

  return <div>채팅페이지에요</div>;
};

export default Chat;
