/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number; // primary columns

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;
}
