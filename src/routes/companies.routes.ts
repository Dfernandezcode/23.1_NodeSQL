import express, { type NextFunction, type Response, type Request } from "express";
import { sqlQuery } from "../databases/sql-db";
export const companiesRouter = express.Router();

// CRUD: READ
companiesRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await sqlQuery(`
      SELECT *
      FROM Tech_Companies
    `);
    const response = { data: rows };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// CRUD: READ
companiesRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const rows = await sqlQuery(`
      SELECT *
      FROM Tech_Companies
      WHERE id=${id}
    `);

    if (rows?.[0]) {
      const response = { data: rows?.[0] };
      res.json(response);
    } else {
      res.status(404).json({ error: "company not found" });
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: CREATE
companiesRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(201).json({});
  } catch (error) {
    next(error);
  }
});

// CRUD: DELETE
companiesRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brandDeleted = null;
    if (brandDeleted) {
      res.json(brandDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: UPDATE
companiesRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brandUpdated = null;
    if (brandUpdated) {
      res.json(brandUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
});
