const _ = require('lodash');
const { getWords } = require('./morphologic');

const limdu = require('limdu');

async function main() {
  const map = [
    { name: 'ワイヤレスイヤホン', labelName: 'イヤホン' },
    { name: 'クラフトボス', labelName: 'コーヒー' },
  ];

  const wordMap = Promise.all(map.map(async item => {
    const words = await getWords(item.name);
    console.log(words);
    return { input: words, output: item.labelName }
  });

  console.log(wordMap);

  // var MyWinnow = limdu.classifiers.Winnow.bind(0, { retrain_count: 10 });
  //
  // var intentClassifier = new limdu.classifiers.multilabel.BinaryRelevance({
  //   binaryClassifierType: MyWinnow
  // });
  //
  // intentClassifier.trainBatch([
  //   { input: { I: 1, want: 1, an: 1, apple: 1 }, output: "APPLE" },
  //   { input: { I: 1, want: 1, a: 1, banana: 1 }, output: "BANANA" },
  //   { input: { I: 1, want: 1, chips: 1 }, output: "CHIPS" }
  // ]);
  //
  // console.dir(intentClassifier.classify({ I: 1, want: 1, an: 1, apple: 1, and: 1, a: 1, banana: 1 }));// ['APPLE','BANANA']
}

main();