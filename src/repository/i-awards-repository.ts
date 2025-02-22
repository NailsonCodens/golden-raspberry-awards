
export interface AwardsDataInput{
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string;  
}

interface Awards{
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string;  
}

export interface IAwardsRepository{
  importData(data: AwardsDataInput): Promise<void>
  findWinners(): Promise<Awards[]>
}
