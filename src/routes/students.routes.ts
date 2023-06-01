import { Router, type NextFunction, type Request, type Response } from "express";

// Typeorm
import { Student } from "../models/typeorm/Student";
import { AppDataSource } from "../databases/typeorm-datasource";
import { type Repository } from "typeorm";
// create repository for data:
const studentRepository: Repository<Student> = AppDataSource.getRepository(Student);

// Router
export const studentsRouter = Router();

// CRUD: READ
studentsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students: Student[] = await studentRepository.find();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

studentsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idReceivedInParams = parseInt(req.params.id);

    const student = await studentRepository.findOne({
      where: {
        id: idReceivedInParams,
      },
    });

    if (!student) {
      res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
});

// CRUD: CREATE
studentsRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Construimos student
    const newStudent = new Student();

    // Asignamos valores
    Object.assign(newStudent, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const studentSaved = await studentRepository.save(newStudent);

    res.status(201).json(studentSaved);
  } catch (error) {
    next(error);
  }
});

// CRUD: DELETE
studentsRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idReceivedInParams = parseInt(req.params.id);

    const studentToRemove = await studentRepository.findOneBy({
      id: idReceivedInParams,
    });

    if (!studentToRemove) {
      res.status(404).json({ error: "Student not found" });
    } else {
      await studentRepository.remove(studentToRemove);
      res.json(studentToRemove);
    }
  } catch (error) {
    next(error);
  }
});

studentsRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idReceivedInParams = parseInt(req.params.id);

    const studentToUpdate = await studentRepository.findOneBy({
      id: idReceivedInParams,
    });

    if (!studentToUpdate) {
      res.status(404).json({ error: "Student not found" });
    } else {
      // Asignamos valores
      Object.assign(studentToUpdate, req.body);

      const updatedStudent = await studentRepository.save(studentToUpdate);
      res.json(updatedStudent);
    }
  } catch (error) {
    next(error);
  }
});
