import { awards, Prisma } from "@prisma/client";

export interface IAwardsRepository{
  importData(data: Prisma.awardsUncheckedCreateInput): Promise<void>
  findWinners(): Promise<awards[]>
}
