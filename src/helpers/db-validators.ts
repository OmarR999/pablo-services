
import {
  CatCaseEntity,
  CatDiseaseEntity,
  CatFederalEntityEntity,
  CatOligoEntity,
} from "../entity";


export const caseExistsById = async (id_cat_case: number) => {
  try {
    const caseFound = await CatCaseEntity.findOneBy({
      id_cat_case,
    });
    if (!caseFound) {
      throw new Error(`The Case ID ${id_cat_case} does not exist in the database`);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const diseaseExistsById = async (id_cat_disease: number) => {
  try {
    const diseaseFound = await CatDiseaseEntity.findOneBy({
      id_cat_disease,
    });
    if (!diseaseFound) {
      throw new Error(`The Disease ID ${id_cat_disease} does not exist in the database`);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const federalEntityExistsById = async (id_cat_federal_entity: number) => {
  try {
    const federalEntityFound = await CatFederalEntityEntity.findOneBy({
      id_cat_federal_entity,
    });
    if (!federalEntityFound) {
      throw new Error(`The FederalEntity ID ${id_cat_federal_entity} does not exist in the database`);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const oligoExistsById = async (id_cat_oligo: number) => {
  try {
    const oligoFound = await CatOligoEntity.findOneBy({
      id_cat_oligo,
    });
    if (!oligoFound) {
      throw new Error(`The Oligo ID ${id_cat_oligo} does not exist in the database`);
    }
    return true;
  } catch (error) {
    throw error;
  }
};