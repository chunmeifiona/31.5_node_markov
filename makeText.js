/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


/** Make Markov machine from text and generate text from it. */
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${err['path']}: ${err}`);
            process.exit(1);
        }
        handleOut(data);
    })
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        handleOut(res.data);

    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }
}

function handleOut(data) {
    let mm = new markov.MarkovMachine(data);
    console.log(mm.makeText());
}

if (process.argv[2] === "file") {
    cat(process.argv[3]);
} else if (process.argv[2] === "url") {
    webCat(process.argv[3]);
} else {
    console.log("invalid command-line")
}



// $ node makeText.js file eggs.txt
// ... generated text from file 'eggs.txt' ...

// $ node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
// ... generated text from that URL ...