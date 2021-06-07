import { Category } from '../model/category.model';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Array<Category>;

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category(name, description, new Date());
    this.categories.push(category);
  }
}

export { CategoriesRepository };
