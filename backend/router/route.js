const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const speechController = require('../Controllers/speechController');

// User routes
router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.loginUser);
router.post("/api/user/logout", userController.logout);
router.put("/api/user/:id", userController.updateUser);
router.delete("/api/user/:id", userController.deleteUser);

// Speech routes
router.post('/api/user/speech', speechController.saveSpeech);
router.delete('/api/user/speech/:id', speechController.deleteSpeech);
router.get('/api/user/speeches/:userId', speechController.getSpeeches);
router.get('/api/user/wordFrequencies/:userId', speechController.getWordFrequencies); 
router.get('/api/user/compareFrequencies/:userId', speechController.compareWordFrequencies); 
router.get("/api/user/topPhrases/:userId", speechController.getTopPhrases); 
router.get("/api/user/similarUsers/:userId", speechController.getSimilarUsers); 

module.exports = router;
