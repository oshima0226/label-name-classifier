const fs = require('fs');
const csv = require('csv');
const path  = require('path');
const _ = require('lodash');
const { writeCSV, parseCsv } = require('./writeCsv');

const { tokenize, getTokenizer } = require('kuromojin');

// この builder が辞書やら何やらをみて、形態素解析機を造ってくれるオブジェクトです。
// const builder = kuromoji.builder({
//   // ここで辞書があるパスを指定します。今回は kuromoji.js 標準の辞書があるディレクトリを指定
//   dicPath: 'node_modules/kuromoji/dict',
// });
const filename = './label_name_map.csv';

const labelNameMap = parseCsv(filename);


labelNameMap.map(map => {
  const name = map.name

  result.push({ label: data.description, words: words.join(',') });
})
// const parser = csv.parse({ columns: true });
// const readableStream = fs.createReadStream(filename, { encoding: 'utf-8' });
// readableStream.pipe(parser);
//
// parser.on('readable', async () => {
//   const tokenizer = await getTokenizer();
//   let result = [];
//   while (data = parser.read()) {
//     const token = tokenizer.tokenize(data.name);
//     const words = _.chain(token)
//       .reject(item => _.find(['記号', '助詞', '接続詞'], pos => pos === item.pos))
//       .reject(item => _.find(['数', 'サ変接続'], pos => pos === item.pos_detail_1))
//       .reject(item => item.word_type !== 'KNOWN')
//       .map('surface_form')
//       .sortedUniq()
//       .value();
//
//     result.push({ label: data.description, words: words.join(',') });
//   }
//   console.log(result);

  // const {createObjectCsvWriter} = require('csv-writer');
  // csvWriter.writeRecords(records)       // returns a promise

  const header = ['label', 'words'];
  writeCSV(header, result);
  // const stringifier = csv.stringify('output.csv', { columns: columns }, function(err, output) {
  //   fs.writeFile(output);
  // });
  // const writableStream = fs.createWriteStream('output.csv', { columns: columns });
  // stringifier.pipe(writableStream);
  // stringifier.write(result);
// });


// function analyse(data) {
//   console.log(data);
// }

// async function analyze(text) {
//   const tokenizer = await getTokenizer();
//   const text = '辞書内での単語ID';
//   const res = await tokenize(text);
//   // console.log(res);
//     // .then(results => {
//     //   console.log(results)
//       /*
//       [ {
//           word_id: 509800,          // 辞書内での単語ID
//           word_type: 'KNOWN',       // 単語タイプ(辞書に登録されている単語ならKNOWN, 未知語ならUNKNOWN)
//           word_position: 1,         // 単語の開始位置
//           surface_form: '黒文字',    // 表層形
//           pos: '名詞',               // 品詞
//           pos_detail_1: '一般',      // 品詞細分類1
//           pos_detail_2: '*',        // 品詞細分類2
//           pos_detail_3: '*',        // 品詞細分類3
//           conjugated_type: '*',     // 活用型
//           conjugated_form: '*',     // 活用形
//           basic_form: '黒文字',      // 基本形
//           reading: 'クロモジ',       // 読み
//           pronunciation: 'クロモジ'  // 発音
//         } ]
//       */
// }

// async function analyse() {
//   let tokens;
//
//   await asyncBuild
// }

// builder.build();

// console.log('111111111');
// analyze();

// const res = build();
//
// console.log(res);
