import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('friends')
export class Friend {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  friend_id: string;

  @Column({ type: 'varchar', length: 50 })
  user_id_1: string;

  @Column({ type: 'varchar', length: 50 })
  user_id_2: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'declined','block'],
    default: 'pending',
  })
  status: 'pending' | 'accepted' | 'declined'|'block';

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
