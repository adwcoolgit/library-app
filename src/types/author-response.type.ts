export type AuthorResponse = {
  authors: Author[];
};

export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};
