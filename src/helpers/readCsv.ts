import * as fs from 'fs';
import csv from 'csv-parser';

export const readData = async (filePath: string): Promise<Object[]> => {
  const results: Object[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        console.error(error);
        reject(error);
      });
  });
};
