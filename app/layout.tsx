import NavBar from '@/components/NavBar';
import './globals.css';
import { Do_Hyeon } from 'next/font/google';
import Footer from '@/components/Footer';

const do_Hyeon = Do_Hyeon({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata = {
  title: '글길 - 함께 쓰는 리뷰, 이야기가 되어 모이다.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={do_Hyeon.className}>
        <NavBar />
        <div className='pt-16 pb-64 h-full bg-gradient-to-b from-white via-teal-100 to-teal-200'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
