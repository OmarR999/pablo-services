
import { Router } from "express";

import {
  diseaseDelete,
  diseaseGet,
  diseaseGetAll,
  diseasePost,
  diseasePut,
} from "../../controllers/catalogs/disease.catalogs.controllers";
import {
  check,
  param,
  query,
} from "express-validator";
import { validateFields } from "../../middlewares";
import {
  diseaseExistsById
} from "../../helpers";


const router = Router();

router.get("/", [
  query("has_analytics", "field (has_analytics) is required").optional().default(null),
  query("has_surveillance", "field (has_surveillance) is required").optional().default(null),
  ],
  diseaseGetAll
);

router.get("/:id_cat_disease", [
    param("id_cat_disease", "field (id_cat_disease) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_disease").custom(diseaseExistsById),
    validateFields,
  ],
  diseaseGet,
);

router.put("/:id_cat_disease", [
    param("id_cat_disease", "field (id_cat_disease) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("disease", "field (disease) is required").not().isEmpty(),
    check("path_image", "field (path_image) is required").optional().default(null),
    check("directory", "field (directory) is required").not().isEmpty(),
    check("has_analytics", "field (has_analytics) is required").not().isEmpty().isBoolean(),
    check("has_surveillance", "field (has_surveillance) is required").not().isEmpty().isBoolean(),
    validateFields,
    param("id_cat_disease").custom(diseaseExistsById),
    validateFields,
  ],
  diseasePut,
);

router.post("/", [
    check("disease", "field (disease) is required").not().isEmpty(),
    check("path_image", "field (path_image) is required").optional().default(null),
    check("directory", "field (directory) is required").not().isEmpty(),
    check("has_analytics", "field (has_analytics) is required").not().isEmpty().isBoolean(),
    check("has_surveillance", "field (has_surveillance) is required").not().isEmpty().isBoolean(),
    validateFields,
  ],
  diseasePost,
);

router.delete("/:id_cat_disease", [
    param("id_cat_disease", "field (id_cat_disease) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_disease").custom(diseaseExistsById),
    validateFields,
  ],
  diseaseDelete,
);

export default router;
