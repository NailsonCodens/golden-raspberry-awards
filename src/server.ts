import { app } from "./app";
import { env } from './env'
import { AwardsRepository } from "./repository/awards-repository";
import { importCSV } from "./core/importCSV";
import { InMemoryAwardsRepository } from "./repository/in-memory-awards-repository";

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(async() => {
    const inMemoryRepository = new InMemoryAwardsRepository()
    const importCsv = new importCSV(inMemoryRepository)
    await importCsv.execute()

    console.log('Http Server Running!')
  })