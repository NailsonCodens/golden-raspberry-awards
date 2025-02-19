import { app } from "./app";
import { env } from './env'
import { AwardsRepository } from "./repository/awards-repository";
import { importCSV } from "./utils/importCSV";

app.listen(env.PORT, async () => {
  const awardRepository = new AwardsRepository()
  const importCsv = new importCSV(awardRepository)

  await importCsv.execute()

  console.log(`listening on port ${env.PORT}`)
})
