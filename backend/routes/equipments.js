const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipment.controller");

router.get("/", equipmentController.getAll);
router.get("/:id",equipmentController.getOne)
router.post("/", equipmentController.add);
router.put("/",equipmentController.update)
router.delete("/:id", equipmentController.destroy);
module.exports = router;
