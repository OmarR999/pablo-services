
import { Request, Response } from 'express';

import {
  CatFederalEntityEntity,
} from '../../entity';


export const federalEntityGetAll = async (req: Request, res: Response) => {
  try {
    let federalEntitysList: CatFederalEntityEntity[] = await CatFederalEntityEntity.find();
    return res.status(200).json({
      list: federalEntitysList,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const federalEntityGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_federal_entity } = req.params;
    const federalEntityFound = await CatFederalEntityEntity.findOne({
      where: {
        id_cat_federal_entity: parseInt(id_cat_federal_entity),
      },
    });
    return res.status(200).json({
      federalEntity: federalEntityFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const federalEntityPut = async (req: Request, res: Response) => {
  const { id_cat_federal_entity } = req.params;
  const {
    federal_entity,
    abbreviation,
    federal_key,
    id_key_geojson,
  }: {
    federal_entity: string,
    abbreviation: string,
    federal_key: number,
    id_key_geojson: string,
  } = req.body;
  try {
    const federalEntityUpdating = await CatFederalEntityEntity.findOne({
      where: {
        id_cat_federal_entity: parseInt(id_cat_federal_entity),
      },
    });
    federalEntityUpdating!.federal_entity = federal_entity;
    federalEntityUpdating!.abbreviation = abbreviation;
    federalEntityUpdating!.federal_key = federal_key;
    federalEntityUpdating!.id_key_geojson = id_key_geojson;
    await federalEntityUpdating!.save();
    return res.status(200).json({
      federalEntity: federalEntityUpdating,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const federalEntityPost = async (req: Request, res: Response) => {
  const {
    federal_entity,
    abbreviation,
    federal_key,
    id_key_geojson,
  }: {
    federal_entity: string,
    abbreviation: string,
    federal_key: number,
    id_key_geojson: string,
  } = req.body;
  try {
    const newFederalEntity = new CatFederalEntityEntity();
    newFederalEntity.federal_entity = federal_entity;
    newFederalEntity.abbreviation = abbreviation;
    newFederalEntity.federal_key = federal_key;
    newFederalEntity.id_key_geojson = id_key_geojson;
    await newFederalEntity.save();
    return res.status(200).json({
      federalEntity: newFederalEntity,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const federalEntityDelete = async (req: Request, res: Response) => {
  const { id_cat_federal_entity } = req.params;
  try {
    const federalEntityDeleting = await CatFederalEntityEntity.findOne({
      where: {
        id_cat_federal_entity: parseInt(id_cat_federal_entity),
      },
    });
    await federalEntityDeleting!.remove();
    return res.status(200).json({
      federalEntity: federalEntityDeleting
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};