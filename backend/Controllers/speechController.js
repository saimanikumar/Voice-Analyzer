// const Speech = require("../Models/speechModel");

// const saveSpeech = async (req, res) => {
//   try {
//     const { userId, speechText, language } = req.body;
//     console.log(speechText);
//     // Save the user's speech to the database
//     const savedSpeech = await Speech.create({
//       userId,
//       speechText,
//       language,
//     });

//     return res.status(201).json(savedSpeech);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

// const { Translate } = require("@google-cloud/translate").v2;
const { translate }  = require('@vitalets/google-translate-api');

const Speech = require("../Models/speechModel");

// Create a Translate client
// const translate = new Translate({ projectId: 'placementmanagement-d1be1' });

const saveSpeech = async (req, res) => {
  try {
    const { userId, speechText } = req.body;
    console.log(speechText);

    console.log("djkdflkdf");
    // Detect the language of the speech text
    // const [detectionResult] = await translate.detect(speechText);
    // const detectedLanguage = detectionResult.language;
    // console.log(detectedLanguage);

    // // Translate speech text to English if the detected language is not English
    // let translatedText = speechText;
    // if (detectedLanguage !== "en") {
    //   const [translation] = await translate.translate(speechText, "en");
    //   translatedText = translation;
    // }
    const { text } = await translate(speechText, { to: 'en' });

    console.log(text);
    // Save the user's speech to the database with the detected language
    const savedSpeech = await Speech.create({
      userId,
      speechText: text,
      language: 'en',
    });

    return res.status(201).json(savedSpeech);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSpeeches = async (req, res) => {
  try {
    console.log("speeches");
    const userId = req.params.userId; // Assuming you're passing the userId in the URL
    const speeches = await Speech.find({ userId });
    // console.log(speeches);
    return res.status(200).json(speeches);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteSpeech = async (req, res) => {
  try {
    const speechId = req.params.id;
    // Assuming you're using a middleware to validate the user's access to this speech
    // and ensuring they own this speech before deletion.
    // Implement your logic to validate ownership of the speech here.

    // Delete the speech
    await Speech.deleteOne({ _id: speechId });

    return res.status(200).json({ message: "Speech deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { saveSpeech, deleteSpeech, getSpeeches };
