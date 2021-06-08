import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private readonly listCategoryUseCase: ListCategoriesUseCase) {}
  handle(request: Request, response: Response): Response {
    const categories = this.listCategoryUseCase.execute();
    return response.json(categories);
  }
}

export { ListCategoriesController };
