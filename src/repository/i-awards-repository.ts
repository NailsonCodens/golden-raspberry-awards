import { Prisma } from "@prisma/client";

export interface IAwardsRepository{
  importData(data: Prisma.awardsUncheckedCreateInput[]): Promise<void>
}
