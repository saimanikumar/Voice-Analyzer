const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const empController = require("../Controllers/empController");
const razorPay = require("../Controllers/razorPay");
const speechController = require('../Controllers/speechController'); // Import speech controller


//=======================> User <====================

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.loginUser);
router.post("/api/user/logout", userController.logout);
router.put("/api/user/:id", userController.updateUser);
router.delete("/api/user/:id", userController.deleteUser);

//=======================> Employ <====================

router.get("/api/user/emp", empController.getEmp)
router.get("/api/user/emp/:id", empController.getEmpById)
router.post("/api/user/emp", empController.addEmp)
router.put("/api/user/emp/:id", empController.updateEmp)
router.delete("/api/user/emp/:id", empController.deleteEmp)

//=======================> payment <====================
router.post("/api/payment", razorPay.payment)
router.post("/api/payment/verify", razorPay.verifyPaymnet)

//=======================> Speech <====================
router.post('/api/user/speech', speechController.saveSpeech);
router.delete('/api/user/speech/:id', speechController.deleteSpeech);
router.get('/api/user/speeches/:userId', speechController.getSpeeches); // New route to fetch speeches by userId


module.exports = router;