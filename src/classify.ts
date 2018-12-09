import parseCsv from './CsvParser';
import * as _ from 'lodash';

const natural = require('natural');

async function classify() {
  const classifierPath = './classifier.json';
  const stemmer = new natural.StemmerJa;

  const target = parseCsv('./targetNames.csv');
  const targetNames: string[] = _.map(target, 'name');

  console.log(targetNames);

  // const classifier = natural.BayesClassifier;
  // or
  const classifier = natural.BayesClassifier;

  classifier.load(classifierPath, stemmer, function(err, classifier) {
    targetNames.forEach(name => {
      const result = classifier.classify(name);
      console.log(result);
    });
  });
}

classify();