import { IAwardsRepository } from "../repository/i-awards-repository";

interface ProducerAward {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export class AwardsIntervalUseCase {
  constructor(private awardsRepository: IAwardsRepository) {}

  async execute() {
    const awardsWinners = await this.awardsRepository.findWinners()

    const producerIntervals: Record<string, number[]> = {};

    awardsWinners.forEach(({ producers, year }) => {
      const producerList = producers
        .split(',')
        .map((p) => p.trim())
        .flatMap((p) => p.split(' and ').map((prod) => prod.trim()));

      producerList.forEach((producer) => {
        if (!producerIntervals[producer]) {
          producerIntervals[producer] = [];
        }
        producerIntervals[producer].push(year);
      });
    });

    const intervals: ProducerAward[] = [];

    for (const producer in producerIntervals) {
      const years = producerIntervals[producer].sort((a, b) => a - b);

      if (years.length > 1) {
        for (let i = 1; i < years.length; i++) {
          intervals.push({
            producer,
            interval: years[i] - years[i - 1],
            previousWin: years[i - 1],
            followingWin: years[i],
          });
        }
      }
    }

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    const min = intervals.filter((i) => i.interval === minInterval);
    const max = intervals.filter((i) => i.interval === maxInterval);

    return { min, max };
  }
}
