
import { Router } from "express";

import {
  federalEntityDelete,
  federalEntityGet,
  federalEntityGetAll,
  federalEntityPost,
  federalEntityPut,
} from "../../controllers/catalogs/federal-entity.catalogs.controllers";
import {
  check,
  param,
} from "express-validator";
import { validateFields } from "../../middlewares";
import {
  federalEntityExistsById
} from "../../helpers";


const router = Router();

router.get("/", federalEntityGetAll);

router.get("/:id_cat_federal_entity", [
    param("id_cat_federal_entity", "field (id_cat_federal_entity) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_federal_entity").custom(federalEntityExistsById),
    validateFields,
  ],
  federalEntityGet,
);

router.put("/:id_cat_federal_entity", [
    param("id_cat_federal_entity", "field (id_cat_federal_entity) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("federal_entity", "field (federal_entity) is required").not().isEmpty(),
    check("abbreviation", "field (abbreviation) is required").not().isEmpty(),
    check("federal_key", "field (federal_key) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("id_key_geojson", "field (id_key_geojson) is required").not().isEmpty(),
    validateFields,
    param("id_cat_federal_entity").custom(federalEntityExistsById),
    validateFields,
  ],
  federalEntityPut,
);

router.post("/", [
    check("federal_entity", "field (federal_entity) is required").not().isEmpty(),
    check("abbreviation", "field (abbreviation) is required").not().isEmpty(),
    check("federal_key", "field (federal_key) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("id_key_geojson", "field (id_key_geojson) is required").not().isEmpty(),
    validateFields,
  ],
  federalEntityPost,
);

router.delete("/:id_cat_federal_entity", [
    param("id_cat_federal_entity", "field (id_cat_federal_entity) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_federal_entity").custom(federalEntityExistsById),
    validateFields,
  ],
  federalEntityDelete,
);

export default router;
