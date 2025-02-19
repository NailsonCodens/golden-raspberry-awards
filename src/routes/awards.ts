import { Router } from "express";
import { AwardsIntervalController } from "../controllers/awards-intervals-controller";

export const awardsRoutes = Router()
const awardsIntervalsController = new AwardsIntervalController()

awardsRoutes.get('/intervals', (req, res) => {
  awardsIntervalsController.handle(req, res)  
})