const { translate } = require("@vitalets/google-translate-api");
const natural = require("natural");

const Speech = require("../Models/speechModel");

const saveSpeech = async (req, res) => {
  try {
    const { userId, speechText } = req.body;

    // Translate speech text to English4

    console.log(speechText)
    
    const { text: translatedText1 } = await translate(speechText, { to: "de" });

    // console.log(translatedText1)

    const { text: translatedText } = await translate(translatedText1, { to: "en" });

    console.log(translatedText);

    

    // Save the user's speech to the database with the corrected text
    const savedSpeech = await Speech.create({
      userId,
      speechText: translatedText,
      language: "en",
    });

    return res.status(201).json(savedSpeech);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};







const getSpeeches = async (req, res) => {
  try {
    const userId = req.params.userId;
    const speeches = await Speech.find({ userId });
    return res.status(200).json(speeches);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteSpeech = async (req, res) => {
  try {
    const speechId = req.params.id;
    await Speech.deleteOne({ _id: speechId });
    return res.status(200).json({ message: "Speech deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { saveSpeech, deleteSpeech, getSpeeches };
