import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
