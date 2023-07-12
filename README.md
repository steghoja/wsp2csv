# wsp2csv -- Convert WhisperX JSON files to CSV

This simple script takes a JSON file created by [WhisperX](https://github.com/m-bain/whisperX) and converts it to a CSV file. In doing so, the script expects a `segments` array on the top level of the JSON object in the input file. It extracts information for the `start`, `end`, `speaker`, and `text` fields. In addition, it also trims all strings which is mostly useful for removing whitespace around the content of the `text` field.

## Usage

1. Clone this repository.
2. Run `npm install` to download the necessary dependencies
3. Execute `node wsp2csv.mjs -i <inputfile> -o <outputfile>`

If you do not provide an input file or an output file, the script will default to `whisper.json` and `whisper.csv` respectively.

## Disclaimer

This was thrown together in about an hour with minimal experience with node.js. I'd be  happy to accept your pull requests if you want to pretty it up. Obviously, I do not take any responsibility for anything that you do with this.