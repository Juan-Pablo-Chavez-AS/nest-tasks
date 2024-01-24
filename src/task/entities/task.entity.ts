import { MemoryStoredFile } from 'nestjs-form-data';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  title: string;

  @Column()
  dueDate: Date;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ nullable: true })
  imageUrl: string;

  image: MemoryStoredFile;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  user: User;
}
