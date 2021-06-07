import { Router } from "express";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/categories", (request, response) => {
  const { name, description } = request.body;

  const newCategory = { name, description };
  categories.push(newCategory);

  return response.status(201).send();
});

export { categoriesRoutes };
