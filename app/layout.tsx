import './globals.css';

export const metadata = {
  title: '글길 - 함께 쓰는 리뷰, 이야기가 되어 모이다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
