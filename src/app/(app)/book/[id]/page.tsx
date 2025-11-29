'use client';

import { DetailBook } from '@/components/detail-book';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { use } from 'react';

interface BookPageProps {
  params: Promise<{ id: number }>;
}

export default function Book({ params }: BookPageProps) {
  const { id } = use(params);

  return (
    <>
      <Header />
      <DetailBook id={id} />
      <Footer />
    </>
  );
}
