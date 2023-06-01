/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number | undefined; // primary columns

  @Column()
  firstName: string | undefined;

  @Column()
  lastName: string | undefined;
}
