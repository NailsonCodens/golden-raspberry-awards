import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { exec } from 'child_process';
import { promisify } from 'util';

import { importCSV } from '../../src/core/importCSV';
import { AwardsRepository } from '../../src/repository/awards-repository';
import { app } from '../../src/app';
import { IAwardsRepository } from '../../src/repository/i-awards-repository';
import { InMemoryAwardsRepository } from '../../src/repository/in-memory-awards-repository';

const execPromise = promisify(exec);

let awardRepository: IAwardsRepository;

describe('Golden Raspberry Awards (e2e)', () => {

    beforeAll(async () => {
      awardRepository = new InMemoryAwardsRepository()

      const importCsv = new importCSV(awardRepository);
  
      await importCsv.execute();

      await app.ready()
    })

    afterAll(async () => {
      await app.close()
    })

  it('Should be able to have min and max property and their properties', async() => {

    const response = await request(app.server)
      .get('/v1/award/intervals')
      .send()

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty('min');
      expect(response.body).toHaveProperty('max');
      expect(Array.isArray(response.body.min)).toBe(true);
      expect(Array.isArray(response.body.max)).toBe(true);

      expect(response.body.min).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            producer: 'Joel Silver',
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          }),
        ])
      );

      expect(response.body.max).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            producer: 'Matthew Vaughn',
            interval: 13,
            previousWin: 2002,
            followingWin: 2015,
          }),
        ])
      );      
  })
})

