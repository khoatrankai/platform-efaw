import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  postId: string;

  @Column({ type: 'enum', enum: ['user', 'page', 'group'] })
  typePost: string;

  @Column({ type: 'varchar', length: 50 })
  pageId: string;

  @Column({ type: 'varchar', length: 50 })
  groupId: string;

  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @ManyToOne(() => Post, (post) => post.postId, { nullable: true })
  shareId: string;

  @Column({ type: 'text', nullable: true })
  contentMain: string;

  @Column({ type: 'enum', enum: ['public', 'delete', 'friend', 'private', 'privateGroup'], default: 'public' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
