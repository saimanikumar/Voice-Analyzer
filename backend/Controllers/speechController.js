const { translate } = require("@vitalets/google-translate-api");
const natural = require("natural");
const stopWords = require("stopwords").english;
const Speech = require("../Models/speechModel");
const User = require("../Models/userModel");
const similarity = require("compute-cosine-similarity");

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

    console.log(translatedText);

    const user = await User.findById(userId);
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(translatedText.toLowerCase());

    const filteredWords = words.filter((word) => !stopWords.includes(word));
    // console.log(filteredWords);
    filteredWords.forEach((word) => {
      user.wordFrequencies.set(word, (user.wordFrequencies.get(word) || 0) + 1);
    });

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

    return res.status(200).json({ message: "Speech deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getWordFrequencies = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    // console.log(user.wordFrequencies);
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

    return res.status(200).json(comparisonData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const identifyTopPhrases = async (speechText) => {
  const { NGrams } = natural;

  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(speechText);

  // console.log(speechText);

  const phrases = NGrams.ngrams(words, 4, true);

  // console.log(phrases)

  const filteredArray = phrases.filter(innerArray => !innerArray.some(value => typeof value === 'boolean'));

  // console.log(filteredArray);

  const phraseFrequencies = new Map();
  filteredArray.forEach((phrase) => {
    phraseFrequencies.set(
      phrase.join(" "),
      (phraseFrequencies.get(phrase.join(" ")) || 0) + 1
    );
  });

  // console.log(phraseFrequencies)

  const topPhrases = Array.from(phraseFrequencies.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([phrase]) => phrase);

  return topPhrases;
};

const getTopPhrases = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const speeches = await Speech.find({ userId });
    const allSpeechText = speeches.map((speech) => speech.speechText).join(" ");

    if (allSpeechText.trim() === "") return res.status(200).json([]);

    const topPhrases = await identifyTopPhrases(allSpeechText);

    return res.status(200).json(topPhrases);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error retrieving top phrases" });
  }
};

async function findSimilarUsers(currentUserId) {
  const allUserSpeeches = await Speech.find({});

  const currentUserSpeeches = allUserSpeeches.filter(
    (speech) => speech.userId.toString() === currentUserId
  );
  const otherUserSpeeches = allUserSpeeches.filter(
    (speech) => speech.userId.toString() !== currentUserId
  );

  // console.log(currentUserSpeeches);
  const similarities = [];

  for (const currentSpeech of currentUserSpeeches) {
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(currentSpeech.speechText);

    for (const otherSpeech of otherUserSpeeches) {
      tfidf.addDocument(otherSpeech.speechText);

      const currentSpeechTerms = tfidf.listTerms(0);
      const otherSpeechTerms = tfidf.listTerms(1);

      const matchingTerms = currentSpeechTerms.filter((term1) =>
        otherSpeechTerms.some((term2) => term1.term === term2.term)
      );

      const currentSpeechVector = matchingTerms.map(
        (term) => currentSpeechTerms.find((t) => t.term === term.term).tfidf
      );
      const otherSpeechVector = matchingTerms.map(
        (term) => otherSpeechTerms.find((t) => t.term === term.term).tfidf
      );

      const similarityScore = similarity(
        currentSpeechVector,
        otherSpeechVector
      );

      similarities.push({
        user: otherSpeech.userId,
        similarity: similarityScore,
        currentSpeechId: currentSpeech.id,
        otherSpeechId: otherSpeech.id,
      });
    }
  }

  const averageSimilarities = [];
  const userMap = new Map();
  for (const similarity of similarities) {
    if (!userMap.has(similarity.user.toString())) {
      userMap.set(similarity.user.toString(), []);
    }
    userMap.get(similarity.user.toString()).push(similarity.similarity);
  }

  for (const [userId, similarityScores] of userMap) {
    const averageSimilarity =
      similarityScores.reduce((sum, score) => sum + score, 0) /
      similarityScores.length;

    const userName = await User.findById(userId);

    averageSimilarities.push({
      user: userId,
      username: userName.username,
      averageSimilarity,
    });
  }

  averageSimilarities.sort((a, b) => b.averageSimilarity - a.averageSimilarity);

  return averageSimilarities.slice(0, 3);
}

const getSimilarUsers = async (req, res) => {
  const userId = req.params.userId;
  try {
    const similarUsers = await findSimilarUsers(userId);
    // console.log(similarUsers);
    res.json(similarUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveSpeech,
  deleteSpeech,
  getSpeeches,
  getWordFrequencies,
  compareWordFrequencies,
  getTopPhrases,
  getSimilarUsers,
};
