import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('profile_social_media')
export class ProfileSocialMedia {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  profile_id: string;

  @Column({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_picture: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover_photo: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    default: 'male',
  })
  gender: string;

  @Column({
    type: 'enum',
    enum: ['active', 'delete', 'hide'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
