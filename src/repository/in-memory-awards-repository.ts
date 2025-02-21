import { Award } from "../core/importCSV";
import { db } from "../lib/setupSqlite";
import { AwardsDataInput, IAwardsRepository } from "./i-awards-repository";

export class InMemoryAwardsRepository implements IAwardsRepository {
  async importData(data: AwardsDataInput){
    db.get('SELECT title FROM awards WHERE title = ?', [data.title], (err, row) => {
      if (err) {
        console.error('Erro ao verificar existência do filme:', err);
        return;
      }

      if (row) {
        db.run(
          `UPDATE awards SET year = ?, studios = ?, producers = ?, winner = ? WHERE title = ?`,
          [data.year, data.studios, data.producers, data.winner, data.title],
          (err) => {
            if (err) {
              console.error('Erro ao atualizar filme:', err);
            }
          }
        );
      } else {
        db.run(
          `INSERT INTO awards (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
          [data.year, data.title, data.studios, data.producers, data.winner],
          (err) => {
            if (err) {
              console.error('Erro ao inserir filme:', err);
            }
          }
        );
      }
    });
  }

  async findWinners(): Promise<Award[]> {
    return new Promise<Award[]>((resolve, reject) => {
      db.all("SELECT * FROM awards WHERE winner = 'yes'", (err: any, rows: Award[]) => {
        if (err) {
          reject('Erro na consulta: ' + err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}