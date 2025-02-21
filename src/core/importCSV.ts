import { createReadStream } from "fs";
import csv from "csv-parser";
import path from "path";
import { IAwardsRepository } from "../repository/i-awards-repository";
import { promisify } from "util";
import { exec } from "child_process";
import { setupDatabase } from "../lib/setupSqlite";

export interface Award {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string
}

const execPromise = promisify(exec);

export class importCSV{
  constructor(private awardsRepository: IAwardsRepository){}

  async execute(){

    await setupDatabase()

    console.log('Começando o processo de importação dos dados, só um momento.')
    const fileData = path.join(__dirname, '../data/move-list.csv')
  
    const awards: Award[] = [];
  
    return new Promise<void>((resolve, reject) => {
      createReadStream(fileData)
        .pipe(csv({ separator: ";" }))
        .on("data", (data: Award) => {
          awards.push({
            year: Number(data.year),
            title: data.title,
            studios: data.studios,
            producers: data.producers,
            winner: data.winner,
          });
        })
        .on("end", async () => {

          if (awards.length === 0) {
            console.warn("Aviso: Nenhum dado encontrado no CSV.");
            return resolve();
          }

          try {
            for (const award of awards) {
              await this.awardsRepository.importData(award);
            }
            console.log(`Importação concluída: ${awards.length} registros inseridos ou atualizados.`);
          }catch (error) {
            console.error("Erro ao inserir dados no banco:", error);
          }
          
          resolve();
        })
        .on("error", (error) => {
          console.error("Erro ao ler o CSV:", error);
          reject(error);
        });      
      });
  }
}
