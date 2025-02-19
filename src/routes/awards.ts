import { Router } from "express";
import { AwardsIntervalController } from "../controllers/awards-intervals-controller";
import { FastifyInstance } from "fastify";

const awardsIntervalsController = new AwardsIntervalController()

export async function awardsRoutes(app: FastifyInstance){
  app.get('/v1/award/intervals', awardsIntervalsController.handle)
}

