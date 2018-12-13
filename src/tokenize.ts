import { BayesClassifier, Tokenizer } from 'natural';
import parseCsv from './CsvParser';
import normalize from './normalization';

const natural = require('natural');

function tokenize() {
  const csvPath = 'label_name_map_min.csv';
  const trainData = <{ label: string, name: string }[]> parseCsv(csvPath);

  const tokenizer = new natural.TokenizerJa();
  trainData.forEach(data => {
    const token = tokenizer.attach(data.name);
    const result = normalize(token);
    console.log(`[name: ${data.name}] => [token: ${token}]`);
  });
}

function stemmer() {
  const csvPath = 'targetNames.csv';
  const trainData = <{ name: string }[]> parseCsv(csvPath);

  const tokenizer = <Tokenizer> new natural.TokenizerJa;
  trainData.forEach(map => {
    const token: string[] = normalize(tokenizer.tokenize(map.name));
    console.log(token);
  });
}

stemmer();