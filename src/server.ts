import { app } from "./app";
import { env } from './env'
import { AwardsRepository } from "./repository/awards-repository";
import { importCSV } from "./utils/importCSV";


app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(async() => {
    const awardRepository = new AwardsRepository()

    const importCsv = new importCSV(awardRepository)
  
    await importCsv.execute()

    console.log(`Http Server Running! ${env.PORT}`)
  })
