
import { Request, Response } from 'express';

import {
  CatCaseEntity,
  CatDiseaseEntity,
  CatFederalEntityEntity,
} from '../../entity';

export const caseGetAll = async (req: Request, res: Response) => {
  try {
    let casesList: CatCaseEntity[] = await CatCaseEntity.find({
      relations: {
        diseases: true,
        federalEntities: true,
      },
    });
    return res.status(200).json({
      list: casesList,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const caseGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_case } = req.params;
    const caseFound = await CatCaseEntity.findOne({
      where: {
        id_cat_case: parseInt(id_cat_case),
      },
      relations: {
        diseases: true,
        federalEntities: true,
      },
    });
    return res.status(200).json({
      case: caseFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const casePut = async (req: Request, res: Response) => {
  const { id_cat_case } = req.params;
  const {
    cases,
    month,
    year,
    fkDisease,
    fkFederalEntity,
  }: {
    cases: number,
    month: number,
    year: number,
    fkDisease: number,
    fkFederalEntity: number,
  } = req.body;
  try {
    const diseaseEntity = await CatDiseaseEntity.findOne({
      where: {
        id_cat_disease: fkDisease
      }
    });
    const federalEntity = await CatFederalEntityEntity.findOne({
      where: {
        id_cat_federal_entity: fkFederalEntity
      }
    });
    const caseUpdating = await CatCaseEntity.findOne({
      where: {
        id_cat_case: parseInt(id_cat_case),
      },
    });
    caseUpdating!.cases = cases;
    caseUpdating!.month = month;
    caseUpdating!.year = year;
    caseUpdating!.diseases = diseaseEntity!;
    caseUpdating!.federalEntities = federalEntity!;
    await caseUpdating!.save();
    return res.status(200).json({
      case: caseUpdating,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const casePost = async (req: Request, res: Response) => {
  const {
    cases,
    month,
    year,
    fkDisease,
    fkFederalEntity,
  }: {
    cases: number,
    month: number,
    year: number,
    fkDisease: number,
    fkFederalEntity: number,
  } = req.body;
  try {
    const diseaseEntity = await CatDiseaseEntity.findOne({
      where: {
        id_cat_disease: fkDisease
      }
    });
    const federalEntity = await CatFederalEntityEntity.findOne({
      where: {
        id_cat_federal_entity: fkFederalEntity
      }
    });
    const newCase = new CatCaseEntity();
    newCase.cases = cases;
    newCase.month = month;
    newCase.year = year;
    newCase.diseases = diseaseEntity!;
    newCase.federalEntities = federalEntity!;
    await newCase.save();
    return res.status(200).json({
      case: newCase,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const caseDelete = async (req: Request, res: Response) => {
  const { id_cat_case } = req.params;
  try {
    const caseDeleting = await CatCaseEntity.findOne({
      where: {
        id_cat_case: parseInt(id_cat_case),
      },
    });
    await caseDeleting!.remove();
    return res.status(200).json({
      case: caseDeleting
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
