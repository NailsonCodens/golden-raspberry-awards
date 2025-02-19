import { AwardsRepository } from "../repository/awards-repository";
import { AwardsIntervalUseCase } from "../use-case/awards-intervals-use-case";

export function makeAwardsIntervalsUseCase(){
  const awardRepository = new AwardsRepository()
  const useCase = new AwardsIntervalUseCase(awardRepository)

  return useCase
}