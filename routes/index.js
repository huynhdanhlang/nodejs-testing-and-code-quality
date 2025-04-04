const { Router } = require("express");

const router = Router();

router.use(require("./admin"));
router.use(require("./reservations"));
router.use(require("./homepage"));

module.exports = router;
