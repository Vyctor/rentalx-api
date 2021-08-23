import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserTokens };
