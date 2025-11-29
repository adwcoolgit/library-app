import { Author } from './author-response.type';
import { Category } from './categories-response.type';
import { User } from './user.type';

export interface BooksResponse {
  books: Book[];
  pagination: Pagination;
}

export interface BookResponse {
  data: Book;
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
  Review: Review[];
}

interface Review {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  User: User;
}
