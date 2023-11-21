
import { Request, Response } from 'express';

import * as fs from 'fs';
import path from 'path';
import {
  CatCaseEntity,
  CatDiseaseEntity,
  CatFederalEntityEntity,
} from '../../entity';
import { readData } from '../../helpers/readCsv';

export const caseGetByDateAndDisease = async (req: Request, res: Response) => {
  try {
    const {
      month,
      year,
      idCatDisease,
    } = req.query;
    const casesList = await CatCaseEntity.createQueryBuilder('cc')
    .leftJoinAndSelect('cc.diseases', 'cd')
    .leftJoinAndSelect('cc.federalEntities', 'cfe')
    .where('cd.id_cat_disease = :idCatDisease', { idCatDisease })
    .andWhere('cc.month = :month', { month })
    .andWhere('cc.year = :year', { year })
    .getMany();
    return res.status(200).json({
      cases: casesList
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getDatesByDisease = async (req: Request, res: Response) => {
  const idCatDisease = req.query.idCatDisease; 
  try {
    const datesList = await CatCaseEntity.createQueryBuilder('cc')
      .select([
          'cc.month as month',
          'cc.year as year',
      ])
      .innerJoin('cc.diseases', 'cd', 'cd.id_cat_disease = cc.fk_cat_disease')
      .where('cd.id_cat_disease = :idCatDisease', { idCatDisease })
      .groupBy("cc.month")
      .addGroupBy("cc.year")
      .getRawMany();
    return res.status(200).json({
      dates: datesList
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};


export const postLoadCases = async (req: Request, res: Response) => {
  try {
    const mainDirecotryPath = path.join(__dirname, '..', '..', '..', 'csv-files', 'cases');
    const directories = fs.readdirSync(mainDirecotryPath);
    const federalEntities = await getFederalEntities();
    for (const directory of directories) {
      // By disease
      const diseaseDirecotryPath = path.join(mainDirecotryPath, directory);
      const files = fs.readdirSync(diseaseDirecotryPath);

      const foundDisease = await CatDiseaseEntity.findOneBy({
        directory: directory
      });

      if (foundDisease) {
        if (files.length > 0) {
          foundDisease.has_surveillance = true;
          foundDisease.save();
        }
        for (let i = 0; i < files.length; i++) {
          // By month
          const counts: { [key: string]: number } = {};
          const fileName = files[i];
          const filePath = path.join(diseaseDirecotryPath, fileName);
          const fileNameWithoutExt = fileName.replace('.csv', '');
          const yearNumber = parseInt(fileNameWithoutExt.split('-')[0]);
          const monthNumber = parseInt(fileNameWithoutExt.split('-')[1]);
          const casesFound = await CatCaseEntity.find({
            where: {
              year: yearNumber,
              month: monthNumber,
              diseases: {
                id_cat_disease: foundDisease.id_cat_disease
              },
            }
          });
          if (casesFound.length === 0) {
            const jsonData = await readData(filePath);
            jsonData.forEach((row: any) => {
              const entidadRes = row.ENTIDAD_RES;
              counts[entidadRes] = (counts[entidadRes] || 0) + 1;
            });
            for (let j = 0; j < federalEntities.length; j++) {
              const federalEntity = federalEntities[j];
              const newCase = new CatCaseEntity();
              newCase.cases = counts[federalEntity.federal_key] || 0;
              newCase.month = monthNumber;
              newCase.year = yearNumber;
              newCase.diseases = foundDisease;
              newCase.federalEntities = federalEntity;
              await newCase.save();
            }
            console.log(`${i  + 1} of ${files.length} --- ${foundDisease.disease}`);
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

export const getFederalEntities = async (): Promise<CatFederalEntityEntity[]> => {
  try {
    const federalEntitysList = await CatFederalEntityEntity.find();
    return federalEntitysList;
  } catch (error) {
    console.error("Internal server error:", error);
    throw error;
  }
};
