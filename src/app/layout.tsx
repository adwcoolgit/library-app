'use client';

import { Quicksand } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';
import Providers from '@/providers/provider';
import { AuthContext, AuthDialogType } from '@/contexts/auth.context';
import { useState } from 'react';
import { InitAuth } from '@/lib/initAuth';

const quickSans = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dialog, setDialog] = useState<AuthDialogType['dialog']>(undefined);
  return (
    <html lang='en'>
      <body className={clsx(quickSans.variable, `antialiased`)}>
        <Providers>
          <AuthContext.Provider value={{ dialog, setDialog }}>
            <InitAuth />
            {children}
          </AuthContext.Provider>
        </Providers>
      </body>
    </html>
  );
}
