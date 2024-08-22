import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Check } from 'typeorm';

@Entity('users') // Table name
@Check(`"email" IS NOT NULL OR "phone" IS NOT NULL`)
export class User {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'boolean', default: true }) 
  status: boolean;

  @Column({ type: 'varchar', length: 50,nullable:true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50,nullable:true, unique: true })
  phone: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}