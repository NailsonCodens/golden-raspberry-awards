import { InMemoryAwardsRepository } from "../repository/in-memory-awards-repository";
import { AwardsIntervalUseCase } from "../use-case/awards-intervals-use-case";

export function makeAwardsIntervalsUseCase(){
  const inMemoryRepository = new InMemoryAwardsRepository()
  const useCase = new AwardsIntervalUseCase(inMemoryRepository)

  return useCase
}