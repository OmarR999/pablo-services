
import { Request, Response } from 'express';

import * as fs from 'fs';
import path from 'path';
import {
  CatCaseEntity,
  CatDiseaseEntity,
  CatOligoEntity,
} from '../../entity';
import { readData } from '../../helpers/readCsv';

export const postLoadOligos = async (req: Request, res: Response) => {
  try {
    const mainDirecotryPath = path.join(__dirname, '..', '..', '..', 'csv-files', 'oligos');
    const directories = fs.readdirSync(mainDirecotryPath);
    for (const directory of directories) {
      const diseaseDirecotryPath = path.join(mainDirecotryPath, directory);
      const files = fs.readdirSync(diseaseDirecotryPath);
      const foundDisease = await CatDiseaseEntity.findOneBy({
        directory: directory
      });
      if (foundDisease) {
        if (!foundDisease.has_analytics) {
          for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const filePath = path.join(diseaseDirecotryPath, fileName);

            const jsonData = await readData(filePath);
            if (jsonData.length > 0) {
              foundDisease.has_analytics = true;
              foundDisease.save();
            }
            jsonData.forEach(async (row: any, index: number) => {
              const newCatOligoEntity = new CatOligoEntity();
              newCatOligoEntity.type = row.Tipo;
              newCatOligoEntity.fwd = row.Fwd;
              newCatOligoEntity.rev = row.Rev;
              newCatOligoEntity.start = row.Inicio;
              newCatOligoEntity.end = row.Final;
              newCatOligoEntity.length = row.Longitud;
              newCatOligoEntity.sequence = row.Secuencia;
              newCatOligoEntity.degenerations = row.Degeneraciones;
              newCatOligoEntity.tm = row.tm;
              newCatOligoEntity.gc = row.GC;
              newCatOligoEntity.deltaG = row.DeltaG;
              newCatOligoEntity.diseases = foundDisease;
              await newCatOligoEntity.save();
              console.log(`${index  + 1} of ${jsonData.length} --- ${foundDisease.disease}`);
            });
          }
        }
      }
    }
    return res.status(200).json({
      msg: 'Ok'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const oligoGetByDisease = async (req: Request, res: Response) => {
  try {
    const {
      idCatDisease,
    } = req.query;
    const oligosList = await CatOligoEntity.createQueryBuilder('co')
      .leftJoin('co.diseases', 'cd')
      .where('cd.id_cat_disease = :idCatDisease', { idCatDisease })
      .getMany();
    oligosList.forEach(oligo => {
      if (oligo.tm) oligo.tm = Number(oligo.tm);
      if (oligo.gc) oligo.gc = Number(oligo.gc);
      if (oligo.deltaG) oligo.deltaG = Number(oligo.deltaG);
    });
    return res.status(200).json({
      oligos: oligosList
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};