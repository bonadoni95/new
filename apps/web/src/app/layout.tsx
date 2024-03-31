// 'use client';
import { ChakraProvider } from '@chakra-ui/react';
// import { CacheProvider } from '@chakra-ui/next-js';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartContextProvider } from '@/hooks/useCart';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'FreshMart',
//   description: 'The best online grocery in the country',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const sessionCookie: string | undefined = cookies().get('user-token')?.value;
  return (
    <html lang="en">
      <head>
        <title>FreshMart</title>
        <meta
          name="description"
          content="The best online grocery in the country"
        />
        <link rel="icon" type="image/png" href="logo\logo.png" />
      </head>
      <body className={inter.className}>
        <ChakraProvider>
          <CartContextProvider sessionCookie={sessionCookie}>{children}</CartContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
