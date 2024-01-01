const { translate } = require("@vitalets/google-translate-api");
const natural = require("natural");
const stopWords = require('stopwords').english; 

const Speech = require("../Models/speechModel");
const User = require("../Models/userModel");

const saveSpeech = async (req, res) => {
  try {
    const { userId, speechText } = req.body;

    const { text: translatedText1 } = await translate(speechText, { to: "de" });
    const { text: translatedText } = await translate(translatedText1, {
      to: "en",
    });

    const savedSpeech = await Speech.create({
      userId,
      speechText: translatedText,
      language: "en",
    });

    const user = await User.findById(userId);
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(translatedText.toLowerCase());

    const filteredWords = words.filter((word) => !stopWords.includes(word));
    console.log(filteredWords)
    filteredWords.forEach((word) => {
      user.wordFrequencies.set(word, (user.wordFrequencies.get(word) || 0) + 1);
    });
    // console.log(user.wordFrequencies.json())
    await user.save();
    
    return res.status(201).json(savedSpeech);
  } catch (error) {
    console.log(error.message);
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
    const speech = await Speech.findById(speechId);
    const userId = speech.userId;

    await Speech.deleteOne({ _id: speechId });

    const user = await User.findById(userId);
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(speech.speechText.toLowerCase());

    words.forEach((word) => {
      const frequency = user.wordFrequencies.get(word);
      if (frequency && frequency > 1) {
        user.wordFrequencies.set(word, frequency - 1);
      } else {
        user.wordFrequencies.delete(word);
      }
    });

    await user.save();

    // console.log(user.wordFrequencies);

    return res.status(200).json({ message: "Speech deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getWordFrequencies = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    console.log(user.wordFrequencies)
    return res.status(200).json(user.wordFrequencies);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const compareWordFrequencies = async (req, res) => {
  try {
    const allUsers = await User.find({});
    const userId = req.params.userId;
    const currentUser = await User.findById(userId);
    const currentUserWordFrequencies = currentUser.wordFrequencies;

    const comparisonData = {};

    allUsers.forEach((user) => {
      if (user._id.toString() !== userId) {
        const userWordFrequencies = user.wordFrequencies;

        userWordFrequencies.forEach((frequency, word) => {
          if (currentUserWordFrequencies.has(word)) {
            if (!comparisonData[word]) {
              comparisonData[word] = {
                currentUserFrequency: currentUserWordFrequencies.get(word),
                averageFrequency: frequency,
                count: 1,
              };
            } else {
              comparisonData[word].averageFrequency += frequency;
              comparisonData[word].count++;
            }
          }
        });
      }
    });

    Object.keys(comparisonData).forEach((word) => {
      comparisonData[word].averageFrequency /= comparisonData[word].count;
    });

    // console.log(comparisonData);

    return res.status(200).json(comparisonData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  saveSpeech,
  deleteSpeech,
  getSpeeches,
  getWordFrequencies,
  compareWordFrequencies,
};
