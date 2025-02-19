import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Award } from "../utils/importCSV";
import { IAwardsRepository } from "./i-awards-repository";

export class AwardsRepository implements IAwardsRepository {
  async importData(data: Prisma.awardsUncheckedCreateInput[]){
    await prisma.awards.createMany({data: data })
  }
}