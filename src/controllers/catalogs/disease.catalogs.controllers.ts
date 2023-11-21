
import { Request, Response } from 'express';

import {
  CatDiseaseEntity,
} from '../../entity';

export const diseaseGetAll = async (req: Request, res: Response) => {
  const {
    has_analytics,
    has_surveillance,
  } = req.query;
  try {
    let diseasesList: CatDiseaseEntity[];
    if (has_analytics !== null && has_analytics === 'true') {
      diseasesList = await CatDiseaseEntity.find({
        where: {
          has_analytics: true,
        }
      });
      return res.status(200).json({
        list: diseasesList,
      });
    }
    if (has_surveillance !== null && has_surveillance === 'true') {
      diseasesList = await CatDiseaseEntity.find({
        where: {
          has_surveillance: true,
        }
      });
      return res.status(200).json({
        list: diseasesList,
      });
    }
    diseasesList = await CatDiseaseEntity.find();
    return res.status(200).json({
      list: diseasesList,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const diseaseGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_disease } = req.params;
    const diseaseFound = await CatDiseaseEntity.findOne({
      where: {
        id_cat_disease: parseInt(id_cat_disease),
      },
    });
    return res.status(200).json({
      disease: diseaseFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const diseasePut = async (req: Request, res: Response) => {
  const { id_cat_disease } = req.params;
  const {
    disease,
    path_image,
    directory,
    has_analytics,
    has_surveillance,
  }: {
    disease: string,
    path_image: string,
    directory: string,
    has_analytics: boolean,
    has_surveillance: boolean,
  } = req.body;
  try {
    const diseaseUpdating = await CatDiseaseEntity.findOne({
      where: {
        id_cat_disease: parseInt(id_cat_disease),
      },
    });
    diseaseUpdating!.disease = disease;
    diseaseUpdating!.path_image = path_image;
    diseaseUpdating!.directory = directory;
    diseaseUpdating!.has_analytics = has_analytics;
    diseaseUpdating!.has_surveillance = has_surveillance;
    await diseaseUpdating!.save();
    return res.status(200).json({
      disease: diseaseUpdating,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const diseasePost = async (req: Request, res: Response) => {
  const {
    disease,
    path_image,
    directory,
    has_analytics,
    has_surveillance,
  }: {
    disease: string,
    path_image: string,
    directory: string,
    has_analytics: boolean,
    has_surveillance: boolean,
  } = req.body;
  try {
    const newDisease = new CatDiseaseEntity();
    newDisease.disease = disease;
    newDisease.path_image = path_image;
    newDisease.directory = directory;
    newDisease.has_analytics = has_analytics;
    newDisease.has_surveillance = has_surveillance;
    await newDisease.save();
    return res.status(200).json({
      disease: newDisease,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const diseaseDelete = async (req: Request, res: Response) => {
  const { id_cat_disease } = req.params;
  try {
    const diseaseDeleting = await CatDiseaseEntity.findOne({
      where: {
        id_cat_disease: parseInt(id_cat_disease),
      },
    });
    await diseaseDeleting!.remove();
    return res.status(200).json({
      disease: diseaseDeleting
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
