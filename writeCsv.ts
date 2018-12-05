const util = require('util');
const csv = require('csv');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');
import * as _ from 'lodash';

export function parseCsv(path: string) {
  const data = fs.readFileSync(path);
  if (!data) {
    throw new Error('ファイルが見つかりません');
  }

  return parse(data, { columns: true, ltrim: true, rtrim: true, escape: '\\'});
}

export async function writeCsv(headers: string[], data: {}[], path: string): Promise<void> {
  const body = data.map(row => headers.map(header => _.get(row, header)));

  const output = await util.promisify(csv.stringify)([headers, ...body]);

  await util.promisify(fs.writeFile)(path, output);

  console.log(`csv generated -> ${path}`);
}

export async function writeJson(path: string, object: {}) {
  await util.promisify(fs.writeFile)(path, JSON.stringify(object));
  console.log(`json generated -> ${path}`);
}

export function parseJson(path: string): {} {
  const data = fs.readFileSync(path);

  return JSON.parse(data);
}