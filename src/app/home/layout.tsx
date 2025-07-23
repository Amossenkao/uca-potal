import { Outfit } from 'next/font/google';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${outfit.className} min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}