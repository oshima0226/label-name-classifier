import parseCsv from './CsvParser';

const natural = require('natural');

function generateClassifierJson() {
  const csvPath = 'label_name_map.csv';
  const trainData = <{ label: string, name: string }[]> parseCsv(csvPath);

  const stemmer = new natural.StemmerJa;
  const classifier = new natural.BayesClassifier(stemmer);

  trainData.forEach(map => {
    classifier.addDocument(map.name, map.label);
  });
  classifier.train();

  const savePath = 'classifier.json';
  classifier.save(savePath, function(err, classifier) {
    console.log(`csv generated => ${savePath}`);
  });
}

generateClassifierJson();