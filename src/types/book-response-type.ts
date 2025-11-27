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
  coverImage: string | null;
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

export interface Author {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
