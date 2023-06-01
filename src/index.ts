import { companiesRouter } from "./routes/companies.routes";
import { AppDataSource } from "./databases/typeorm-datasource";
import { type Request, type Response, type NextFunction, type ErrorRequestHandler } from "express";

import express from "express";
import cors from "cors";
import { mongoConnect } from "./databases/mongo-db";
import { sqlConnect } from "./databases/sql-db";

const main = async (): Promise<void> => {
  // Conexión a la BBDD
  const mongoDatabase = await mongoConnect();
  const sqlDatabase = await sqlConnect();
  const datasource = await AppDataSource.initialize();
  // Configuración del server
  const PORT = 3000;
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  // Rutas
  const router = express.Router();
  router.get("/", (req: Request, res: Response) => {
    // res.send(`Esta es la home de nuestra API. Estamos utilizando la BBDD de ${database?.connection?.name as string} `);
    res.send(`
      <h3>API homepage</h3>
      <p>We are using the DB of ${mongoDatabase?.connection?.name as string}</p>
      <p>We are using the DB of ${sqlDatabase?.config?.database as string} of the host ${sqlDatabase?.config.host as string}</p>
      <p>We are using TypeORM with the DB of: ${datasource.options.database as string}</p>
      `);
  });

  router.get("*", (req: Request, res: Response) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  // Middlewares de aplicación, por ejemplo middleware de logs en consola
  app.use((req: Request, res: Response, next: NextFunction) => {
    const date = new Date();
    console.log(`Petición de tipo ${req.method} a la url ${req.originalUrl} el ${date.toString()}`);
    next();
  });

  // Usamos las rutas
  app.use("/companies", companiesRouter);
  app.use("/public", express.static("public"));
  app.use("/", router);

  // Middleware de gestión de errores
  app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log("*** INICIO DE ERROR ***");
    console.log(`PETICIÓN FALLIDA: ${req.method} a la url ${req.originalUrl}`);
    console.log(err);
    console.log("*** FIN DE ERROR ***");

    // Truco para quitar el tipo a una variable
    const errorAsAny: any = err as unknown as any;

    if (err?.name === "ValidationError") {
      res.status(400).json(err);
    } else if (errorAsAny.errmsg?.indexOf("duplicate key") !== -1) {
      res.status(400).json({ error: errorAsAny.errmsg });
    } else {
      res.status(500).json(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`);
  });
};

void main();
