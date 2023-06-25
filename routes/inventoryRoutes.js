const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  inventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//create Inventory routes
router.post("/create-inventory", authMiddleware, inventoryController);

//get blood record route
router.get("/get-inventory", authMiddleware, getInventoryController);

//get recent blood record route
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

//get hospital consumer blood record route
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

//get donars info
router.get("/get-donars", authMiddleware, getDonarsController);

//get hospitals info
router.get("/get-hospitals", authMiddleware, getHospitalsController);

//get organisation info
router.get("/get-organisation", authMiddleware, getOrganisationController);

//get org for hospital
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalController
);

module.exports = router;
