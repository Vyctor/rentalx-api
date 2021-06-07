import { Router } from 'express';

import { Category } from '../model/category.model';

const categoriesRoutes = Router();

const categories: Array<Category> = [];

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = new Category(name, description, new Date());

  categories.push(category);

  return response.status(201).json({ category });
});

export { categoriesRoutes };
