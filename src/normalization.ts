import * as _ from 'lodash';

export default function normalize(words: string[]): string[] {
  const uniqWords = _.uniq(words);

  return uniqWords
    .filter(word => word.match(/[^\d]/))
    .filter(word => word.match(/[^A-z|ぁ-ヴ]/))
    .filter(word => word.match(/[^【|】|※|「|」|『|』|-]/)) // 記号一文字
    ;
}