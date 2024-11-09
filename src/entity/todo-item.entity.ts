import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("public.todo_item")
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 500, nullable: true })
  content: string | null;

  @Column({ name: "is_star", default: false })
  isStar: boolean;

  @Column({ default: "TODO" })
  status: string;

  @Column({ default: 0 })
  seq: number;

  @CreateDateColumn({ name: "create_time" })
  createTime: Date;

  @UpdateDateColumn({ name: "update_time" })
  updateTime: Date;
}
