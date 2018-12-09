const util = require('util');
const csv = require('csv');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

export default function parseCsv(path: string): {}[] {
  const data = fs.readFileSync(path);
  if (!data) {
    throw new Error('ファイルが見つかりません');
  }

  return parse(data, { columns: true, ltrim: true, rtrim: true, escape: '\\'});
}