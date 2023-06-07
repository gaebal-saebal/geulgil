'use client';

import { useState } from 'react';

export default function Home() {
  const [lists, setLists] = useState([]);
  const handleClick = () => {
    fetch('api/get')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLists(data.item);
      });
  };
  console.log(lists);
  return (
    <main>
      <button onClick={handleClick}>API통신보내기</button>

      {lists.length > 0 ? (
        lists.map((list: { title: string }, i) => {
          return <div key={i}>{list.title}</div>;
        })
      ) : (
        <div>로딩중입니다</div>
      )}
    </main>
  );
}
