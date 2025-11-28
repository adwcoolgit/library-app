import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import { Category } from './categories-response.type';

export interface BooksResponse {
  books: Book[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | 'public/images/No-image-available.svg';
  price: number;
  stock: number;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  availableCopies: number;
  borrowCount: number;
  totalCopies: number;
  Author: Author;
  Category: Category;
}
