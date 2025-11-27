export type CategoriesResponse = {
  categories: Array<Category>;
};

export type Category = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
