import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  execute(): Array<Category> {
    return this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };
