/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./Course";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number; // primary columns

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @ManyToOne((type) => Course, (course) => course.students)
  course!: Course;
}

// Students - Use OneToMany

// Student refers to dataset -> in relation to the student's course.
// Cascade means deleting a student will have a cascading effect and delete the student from all related DBs.
