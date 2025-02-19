import { createReadStream } from "fs";
import csv from "csv-parser";
import path from "path";
import { IAwardsRepository } from "../repository/i-awards-repository";

export interface Award {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string
}

export class importCSV{
  constructor(private awardsRepository: IAwardsRepository){}

  async execute(){
    const fileData = path.join(__dirname, '../data/move-list.csv')
  
    const results: Award[] = [];
  
    return new Promise<void>((resolve, reject) => {
      createReadStream(fileData)
        .pipe(csv({ separator: ";" }))
        .on("data", (data: Award) => {

          console.log(data)
          results.push({
            year: Number(data.year),
            title: data.title,
            studios: data.studios,
            producers: data.producers,
            winner: data.winner,
          });
        })
        .on("end", async () => {

          if (results.length === 0) {
            console.warn("Aviso: Nenhum dado encontrado no CSV.");
            return resolve();
          }

          console.log(results)

          try {
            // Insere os dados no repositório
            await this.awardsRepository.importData(results);
            console.log(`Importação concluída: ${results.length} registros inseridos.`);
          } catch (error) {
            console.error("Erro ao inserir dados no banco:", error);
          }
          
          resolve();
        })
        .on("error", (error) => {
          console.error("Erro ao ler o CSV:", error);
          reject(error);
        });      });
  }
  
}
