import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { IAwardsRepository } from "./i-awards-repository";

export class AwardsRepository implements IAwardsRepository {
  async importData(data: Prisma.awardsUncheckedCreateInput){
    await prisma.awards.upsert({
      where: {  
        year_title_unique: { year: data.year
          , title: data.title },        
        year: data.year,
        title: data.title,
        producers: data.producers,
        studios: data.studios,
      },
      update: {},
      create: data,
    })
  }

  async findWinners(){
    const winners = await prisma.awards.findMany({
      where: {
        winner: "yes"
      },
      orderBy: { year: 'asc' }
    })

    return winners
  }
}