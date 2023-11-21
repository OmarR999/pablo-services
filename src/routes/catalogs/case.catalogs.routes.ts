
import { Router } from "express";

import {
  caseDelete,
  caseGet,
  caseGetAll,
  casePost,
  casePut,
} from "../../controllers/catalogs/case.catalogs.controllers";
import {
  check,
  param,
} from "express-validator";
import { validateFields } from "../../middlewares";
import {
  federalEntityExistsById,
  caseExistsById,
  diseaseExistsById
} from "../../helpers";


const router = Router();

router.get("/", caseGetAll);

router.get("/:id_cat_case", [
    param("id_cat_case", "field (id_cat_case) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_case").custom(caseExistsById),
    validateFields,
  ],
  caseGet,
);

router.put("/:id_cat_case", [
    param("id_cat_case", "field (id_cat_case) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("cases", "field (cases) is required").not().isEmpty().isInt({ min: 1 }),
    check("month", "field (month) is required").not().isEmpty().isInt({ min: 1 }),
    check("year", "field (year) is required").not().isEmpty().isInt({ min: 1 }),
    check("fkDisease", "field (fkDisease) is required").not().isEmpty().isInt({ min: 1 }),
    check("fkFederalEntity", "field (fkFederalEntity) is required").not().isEmpty().isInt({ min: 1 }),
    validateFields,

    param("id_cat_case").custom(caseExistsById),
    validateFields,
    param("fkDisease").custom(diseaseExistsById),
    validateFields,
    param("fkFederalEntity").custom(federalEntityExistsById),
    validateFields,
  ],
  casePut,
);

router.post("/", [
    check("cases", "field (cases) is required").not().isEmpty().isInt({ min: 1 }),
    check("month", "field (month) is required").not().isEmpty().isInt({ min: 1 }),
    check("year", "field (year) is required").not().isEmpty().isInt({ min: 1 }),
    check("fkDisease", "field (fkDisease) is required").not().isEmpty().isInt({ min: 1 }),
    check("fkFederalEntity", "field (fkFederalEntity) is required").not().isEmpty().isInt({ min: 1 }),
    validateFields,
    
    param("fkDisease").custom(diseaseExistsById),
    validateFields,
    param("fkFederalEntity").custom(federalEntityExistsById),
    validateFields,
  ],
  casePost,
);

router.delete("/:id_cat_case", [
    param("id_cat_case", "field (id_cat_case) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_case").custom(caseExistsById),
    validateFields,
  ],
  caseDelete,
);

export default router;
