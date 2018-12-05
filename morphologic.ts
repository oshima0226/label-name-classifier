import * as _ from 'lodash';

const fs = require('fs');
const csv = require('csv');
const path  = require('path');
const { writeCsv, parseCsv } = require('./writeCsv');

const { tokenize, getTokenizer } = require('kuromojin');

// この builder が辞書やら何やらをみて、形態素解析機を造ってくれるオブジェクトです。
// const builder = kuromoji.builder({
//   // ここで辞書があるパスを指定します。今回は kuromoji.js 標準の辞書があるディレクトリを指定
//   dicPath: 'node_modules/kuromoji/dict',
// });

async function generateTokenizedCsv() {
  const csvPath = './label_name_map.csv';
  const labelNameMap: {label: string, name: string}[] = parseCsv(csvPath);

  const tokenizer = await getTokenizer();

  const wordsNameMap = await Promise.all(labelNameMap.map(async row => {
      const token = await tokenizer.tokenize(row.name);
      const words = _.chain(token)
        .reject(item => _.includes(['記号', '助詞', '接続詞'], item.pos))
        .reject(item => _.includes(['数', 'サ変接続'], item.pos_detail_1))
        .reject(item => item.word_type !== 'KNOWN')
        .map('surface_form')
        .sortedUniq()
        .value();

      return { label: row.label, words: words.join(',') };
    })
  );
  const path = './words_label_map.csv';

  await writeCsv(['words', 'label'], wordsNameMap, path);
}

generateTokenizedCsv();

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