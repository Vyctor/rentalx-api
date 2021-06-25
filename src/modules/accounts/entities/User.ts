import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  public id: string;
  @Column()
  public name: string;
  @Column()
  public password: string;
  @Column()
  public email: string;
  @Column()
  public driver_license: string;
  @Column()
  public isAdmin: boolean;
  @CreateDateColumn()
  public createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
