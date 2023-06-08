'use client';
export default function Home() {
  return (
    <div>
      <button
        onClick={() => {
          fetch('/api/new', { method: 'POST' })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        글쓰기
      </button>
    </div>
  );
}
