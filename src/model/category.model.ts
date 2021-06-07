import { v4 as uuidV4 } from 'uuid';

class Category {
  constructor(public name: string, public description: string, public created_at: Date, public id?: string) {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
