import { Router } from "express";
import { awardsRoutes } from "./awards";

export const routes = Router();

routes.use("/award", awardsRoutes);