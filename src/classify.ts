import parseCsv from './CsvParser';
import * as _ from 'lodash';

const natural = require('natural');

async function classify() {
  const classifierPath = './classifier.json';
  const stemmer = new natural.StemmerJa;

  const target = parseCsv('./itemNames.csv');
  const targetNames: string[] = _.map(target, 'name');

  const classifier = natural.BayesClassifier;

  classifier.load(classifierPath, stemmer, function(err, classifier) {
    console.log('-----------------------------');
    targetNames.forEach(name => {
      const result = classifier.classify(name);
      console.log(`name:  ${name}`);
      console.log(`label: ${result}`);
      console.log('-----------------------------');
    });
  });
}

classify();