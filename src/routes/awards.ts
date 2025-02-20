import { Router } from "express";
import { AwardsIntervalController } from "../controllers/awards-intervals-controller";
import { FastifyInstance } from "fastify";
import { AwardsRepository } from "../repository/awards-repository";
import { importCSV } from "../utils/importCSV";


const awardsIntervalsController = new AwardsIntervalController()

export async function awardsRoutes(app: FastifyInstance){

  app.get('/v1/award/intervals', awardsIntervalsController.handle)
}

