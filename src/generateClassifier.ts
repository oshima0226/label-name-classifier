import parseCsv from './CsvParser';
import { BayesClassifier, Tokenizer } from 'natural';
import normalize from './normalization';

const natural = require('natural');

function generateClassifierJson() {
  const csvPath = 'label_name_map.csv';
  const trainData = <{ label: string, name: string }[]> parseCsv(csvPath);

  const stemmer = new natural.StemmerJa;
  const classifier = <BayesClassifier> new natural.BayesClassifier(stemmer);

  const tokenizer = <Tokenizer> new natural.TokenizerJa;
  trainData.forEach(map => {
    const token: string[] = normalize(tokenizer.tokenize(map.name));
    if (token.length > 0) {
      classifier.addDocument((token), map.label);
    }
  });
  classifier.train();

  const savePath = 'classifier.json';
  classifier.save(savePath, function(err, classifier) {
    console.log(`csv generated => ${savePath}`);
  });
}

generateClassifierJson();