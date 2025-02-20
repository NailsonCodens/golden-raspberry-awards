import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { exec } from 'child_process';
import { promisify } from 'util';

import { importCSV } from '../../src/utils/importCSV';
import { AwardsRepository } from '../../src/repository/awards-repository';
import { app } from '../../src/app';

const execPromise = promisify(exec);

describe('CheckIn Metrics (e2e)', () => {

    beforeAll(async () => {
      await execPromise('npx prisma migrate dev --name awards');

      const awardRepository = new AwardsRepository();
      const importCsv = new importCSV(awardRepository);
  
      await importCsv.execute();

      await app.ready()
    })

    afterAll(async () => {
      await app.close()
    })

  it('Should be able to have min and max property', async() => {

    const response = await request(app.server)
      .get('/v1/award/intervals')
      .send()

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty('min');
      expect(response.body).toHaveProperty('max');
      expect(Array.isArray(response.body.min)).toBe(true);
      expect(Array.isArray(response.body.max)).toBe(true);
  })


  it('Should be able to have min and max property with their parameters', async () => {
    const response = await request(app.server).get('/v1/award/intervals').send();

    expect(response.body.max).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          producer: expect.any(String),
          interval: expect.any(Number),
          previousWin: expect.any(Number),
          followingWin: expect.any(Number),
        }),
      ])
    );
  });

  it('Should be able to have min and min property', async () => {
    const response = await request(app.server).get('/v1/award/intervals').send();

    expect(response.body.min).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          producer: expect.any(String),
          interval: expect.any(Number),
          previousWin: expect.any(Number),
          followingWin: expect.any(Number),
        }),
      ])
    );
  });
})

