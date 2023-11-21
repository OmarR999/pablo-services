

import { Router } from "express";

import {
  postLoadOligos,
  oligoGetByDisease,
} from "../../controllers/actions/oligo.actions.controllers";


const router = Router();

router.post("/load-data", postLoadOligos);
router.get("/oligos-by-disease", oligoGetByDisease);

export default router;
