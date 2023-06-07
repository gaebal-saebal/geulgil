import './globals.css';
import { Do_Hyeon } from 'next/font/google';

const do_Hyeon = Do_Hyeon({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata = {
  title: '글길 - 함께 쓰는 리뷰, 이야기가 되어 모이다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={do_Hyeon.className}>{children}</body>
    </html>
  );
}
