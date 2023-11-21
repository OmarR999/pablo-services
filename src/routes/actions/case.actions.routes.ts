

import { Router } from "express";

import {
  caseGetByDateAndDisease,
  getDatesByDisease,
  postLoadCases,
} from "../../controllers/actions/case.actions.controllers";


const router = Router();

router.get("/cases-by-date-and-disease", caseGetByDateAndDisease);
router.get("/dates-by-disease", getDatesByDisease);

router.post("/load-data", postLoadCases);
// router.get("/dates", getDates);

export default router;
