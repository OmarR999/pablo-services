
import { Request, Response } from 'express';

import {
  CatOligoEntity,
} from '../../entity';

export const oligoGetAll = async (req: Request, res: Response) => {
  try {
    const oligosList: CatOligoEntity[] = await CatOligoEntity.find({
      relations: {
        diseases: true,
      },
    });
    oligosList.forEach(oligo => {
      if (oligo.tm) oligo.tm = Number(oligo.tm);
      if (oligo.gc) oligo.gc = Number(oligo.gc);
      if (oligo.deltaG) oligo.deltaG = Number(oligo.deltaG);
    });
    return res.status(200).json({
      list: oligosList,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const oligoGet = async (req: Request, res: Response) => {
  try {
    const { id_cat_oligo } = req.params;
    const oligoFound = await CatOligoEntity.findOne({
      where: {
        id_cat_oligo: parseInt(id_cat_oligo),
      },
      relations: {
        diseases: true,
      },
    });
    if (oligoFound) {
      oligoFound.tm = Number(oligoFound.tm);
      oligoFound.gc = Number(oligoFound.gc);
      oligoFound.deltaG = Number(oligoFound.deltaG);
    }
    return res.status(200).json({
      oligo: oligoFound,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const oligoPut = async (req: Request, res: Response) => {
  const { id_cat_oligo } = req.params;
  const {
    type,
    fwd,
    rev,
    start,
    end,
    length,
    sequence,
    degenerations,
    tm,
    gc,
    deltaG,
  }: {
    type: string,
    fwd: boolean,
    rev: boolean,
    start: number,
    end: number,
    length: number,
    sequence: string,
    degenerations: number,
    tm: number,
    gc: number,
    deltaG: number,
  } = req.body;
  try {
    const oligoUpdating = await CatOligoEntity.findOne({
      where: {
        id_cat_oligo: parseInt(id_cat_oligo),
      },
    });
    oligoUpdating!.type = type;
    oligoUpdating!.fwd = fwd;
    oligoUpdating!.rev = rev;
    oligoUpdating!.start = start;
    oligoUpdating!.end = end;
    oligoUpdating!.length = length;
    oligoUpdating!.sequence = sequence;
    oligoUpdating!.degenerations = degenerations;
    oligoUpdating!.tm = tm;
    oligoUpdating!.gc = gc;
    oligoUpdating!.deltaG = deltaG;
    await oligoUpdating!.save();
    return res.status(200).json({
      oligo: oligoUpdating,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const oligoPost = async (req: Request, res: Response) => {
  
  const {
    type,
    fwd,
    rev,
    start,
    end,
    length,
    sequence,
    degenerations,
    tm,
    gc,
    deltaG,
  }: {
    type: string,
    fwd: boolean,
    rev: boolean,
    start: number,
    end: number,
    length: number,
    sequence: string,
    degenerations: number,
    tm: number,
    gc: number,
    deltaG: number,
  } = req.body;
  try {
    const newOligo = new CatOligoEntity();
    newOligo.type = type;
    newOligo.fwd = fwd;
    newOligo.rev = rev;
    newOligo.start = start;
    newOligo.end = end;
    newOligo.length = length;
    newOligo.sequence = sequence;
    newOligo.degenerations = degenerations;
    newOligo.tm = tm;
    newOligo.gc = gc;
    newOligo.deltaG = deltaG;
    await newOligo.save();
    return res.status(200).json({
      oligo: newOligo,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const oligoDelete = async (req: Request, res: Response) => {
  const { id_cat_oligo } = req.params;
  try {
    const oligoDeleting = await CatOligoEntity.findOne({
      where: {
        id_cat_oligo: parseInt(id_cat_oligo),
      },
    });
    await oligoDeleting!.remove();
    return res.status(200).json({
      oligo: oligoDeleting
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
