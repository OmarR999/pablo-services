
import { Router } from "express";

import {
  oligoDelete,
  oligoGet,
  oligoGetAll,
  oligoPost,
  oligoPut,
} from "../../controllers/catalogs/oligo.catalogs.controllers";
import {
  check,
  param,
  query,
} from "express-validator";
import { validateFields } from "../../middlewares";
import {
  oligoExistsById
} from "../../helpers";


const router = Router();

router.get("/", [
  query("has_analytics", "field (has_analytics) is required").optional().default(null),
  query("has_surveillance", "field (has_surveillance) is required").optional().default(null),
  ],
  oligoGetAll
);

router.get("/:id_cat_oligo", [
    param("id_cat_oligo", "field (id_cat_oligo) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_oligo").custom(oligoExistsById),
    validateFields,
  ],
  oligoGet,
);

router.put("/:id_cat_oligo", [
    param("id_cat_oligo", "field (id_cat_oligo) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("type", "field (type) is required").not().isEmpty().isString(),
    check("fwd", "field (fwd) is required").not().isEmpty().isBoolean(),
    check("rev", "field (rev) is required").not().isEmpty().isBoolean(),
    check("start", "field (start) is required").not().isEmpty().isInt(),
    check("end", "field (end) is required").not().isEmpty().isInt(),
    check("length", "field (length) is required").not().isEmpty().isInt(),
    check("sequence", "field (sequence) is required").not().isEmpty().isString(),
    check("degenerations", "field (degenerations) is required").not().isEmpty().isInt(),
    check("tm", "field (tm) is required").not().isEmpty().isNumeric(),
    check("gc", "field (gc) is required").not().isEmpty().isNumeric(),
    check("deltaG", "field (deltaG) is required").not().isEmpty().isNumeric(),
    validateFields,
    param("id_cat_oligo").custom(oligoExistsById),
    validateFields,
  ],
  oligoPut,
);

router.post("/", [
    check("type", "field (type) is required").not().isEmpty().isString(),
    check("fwd", "field (fwd) is required").not().isEmpty().isBoolean(),
    check("rev", "field (rev) is required").not().isEmpty().isBoolean(),
    check("start", "field (start) is required").not().isEmpty().isInt(),
    check("end", "field (end) is required").not().isEmpty().isInt(),
    check("length", "field (length) is required").not().isEmpty().isInt(),
    check("sequence", "field (sequence) is required").not().isEmpty().isString(),
    check("degenerations", "field (degenerations) is required").not().isEmpty().isInt(),
    check("tm", "field (tm) is required").not().isEmpty().isNumeric(),
    check("gc", "field (gc) is required").not().isEmpty().isNumeric(),
    check("deltaG", "field (deltaG) is required").not().isEmpty().isNumeric(),
    validateFields,
  ],
  oligoPost,
);

router.delete("/:id_cat_oligo", [
    param("id_cat_oligo", "field (id_cat_oligo) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    param("id_cat_oligo").custom(oligoExistsById),
    validateFields,
  ],
  oligoDelete,
);

export default router;
