const csv = require('csv');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

exports.writeCSV = function (header, data) {
  const rows = data.map(row => [row.label, row.words]);
  const path = './output.csv';

  csv.stringify([header, ...rows], (_err, output) => {
    fs.writeFile(path, output);
  })
};

exports.parseCsv = async function (path) {
  const data = fs.readFileSync(path);
  return parse(data, { columns: true });
};
