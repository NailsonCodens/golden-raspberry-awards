import { Request, Response, response } from "express";
import { makeAwardsIntervalsUseCase } from "../factories/make-awards-intervals-use-case";

export class AwardsIntervalController{

  async  handle(request: Request, response: Response){
    const awards = makeAwardsIntervalsUseCase()

    const awardsData =  await awards.execute()

    return response.status(200).send(awardsData)
  }
}