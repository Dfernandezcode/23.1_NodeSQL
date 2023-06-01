import { AppDataSource } from "../databases/typeorm-datasource";
import { Student } from "../models/typeorm/Student";

export const studentSeed = async (): Promise<void> => {
  // Nos conectamos a la BBDD
  const dataSource = await AppDataSource.initialize();
  console.log(`Tenemos conexión!! Conectados a ${dataSource?.options?.database as string}`);

  // Eliminamos los datos existentes
  await AppDataSource.manager.delete(Student, {});
  console.log("Existing students deleted");

  // Creamos dos students
  const student1 = {
    firstName: "Ricardo",
    lastName: "Ortega",
  };

  const student2 = {
    firstName: "Ana",
    lastName: "Valle",
  };

  // Create entity
  const student1Entity = AppDataSource.manager.create(Student, student1);
  const student2Entity = AppDataSource.manager.create(Student, student2);

  // Las guardamos en base de datos
  await AppDataSource.manager.save(student1Entity);
  await AppDataSource.manager.save(student2Entity);

  console.log("2 students created");

  // Cerramos la conexión
  await AppDataSource.destroy();
  console.log("SQL connection terminated");
};

void studentSeed();
