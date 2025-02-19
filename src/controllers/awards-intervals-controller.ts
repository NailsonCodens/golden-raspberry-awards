import { Request, Response, response } from "express";
import { makeAwardsIntervalsUseCase } from "../factories/make-awards-intervals-use-case";
import { FastifyReply, FastifyRequest} from "fastify";

export class AwardsIntervalController{

  async  handle(request: FastifyRequest, reply: FastifyReply){
    const awards = makeAwardsIntervalsUseCase()

    const awardsData =  await awards.execute()

    return reply.status(200).send(awardsData)
  }
}