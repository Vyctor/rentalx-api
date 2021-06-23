import { Entity } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('specifications')
class Specification {
  constructor(public name: string, public description: string, public created_at: Date, public id?: string) {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Specification };
