'use client';
export default function Home() {
  const handleClick = () => {
    fetch('api/get', { method: 'GET' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <main>
      <button onClick={handleClick}>API통신보내기</button>메인페이지
    </main>
  );
}
