import NavBar from '@/components/NavBar';
import './globals.css';
import { Do_Hyeon } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const do_Hyeon = Do_Hyeon({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata = {
  title: '글길 - 함께 쓰는 리뷰, 이야기가 되어 모이다.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body className={do_Hyeon.className}>
        <NavBar session={session} />
        {children}
      </body>
    </html>
  );
}
