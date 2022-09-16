/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chainsMap = new Map();
    const words = this.words;

    words.forEach((word, index) => {
      let nextWord = words[index + 1] || null;

      if (chainsMap.has(word)) {
        chainsMap.get(word).push(nextWord);
      } else {
        chainsMap.set(word, [nextWord]);
      }
    });
    this.chainsMap = chainsMap;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const text = [];
    const chainsMap = this.chainsMap;
    const keys = [...chainsMap.keys()];
    let key = keys[Math.floor(Math.random() * keys.length)];
    text.push(key);

    while (key !== null && text.length < numWords) {
      let chains = chainsMap.get(key);

      key = chains[Math.floor(Math.random() * chains.length)];
      text.push(key);
    }

    return text.join(" ");
  }
}


// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm);
// mm.makeText();

module.exports = {
  MarkovMachine
};