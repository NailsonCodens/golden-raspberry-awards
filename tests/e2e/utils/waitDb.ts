import { prisma } from "../../../src/lib/prisma";

export const waitForDb = async () => {
  let attempts = 0;
  const maxAttempts = 10;
  const delay = 500;

  while (attempts < maxAttempts) {
    const awardsCount = await prisma.awards.count();
    if (awardsCount > 0) {
      return;
    }
    
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error('Database did not initialize in time.');
};