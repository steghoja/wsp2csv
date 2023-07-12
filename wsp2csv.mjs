'use strict';
import { Parser } from 'json2csv';
import fs from 'fs';
import { string as defaultStringFormatter } from '@json2csv/formatters';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));

(async () => {
    const argv = await yargs
		.usage('Converts a JSON file written by WhisperX into a CSV file containing timestamps, speakers, and the text.')
        .option('input', { type: 'string', require: true })
        .alias('i', 'input')
        .default('input', 'whisper.json')
        .describe('input', 'The input file in JSON format as written by WhisperX.')
        .option('output', { type: 'string', require: true })
        .alias('o', 'output')
        .describe('output', 'The desired output CSV file.')
        .default('output', 'whisper.csv')
        .alias('h', 'help')
        .argv;

	const trimStringFormatter = (stringFormatter = defaultStringFormatter()) => {
		return (value) => {
			return stringFormatter(value.trim())
		}
	}

	console.log(`Loading JSON input from ${argv.input}...`);
	let rawdata = fs.readFileSync(argv.input);
	let whisperJSON = JSON.parse(rawdata);

	if (!whisperJSON.segments || whisperJSON.segments.length == 0) {
		console.log("Input file has invalid format: needs to contain a non-empty \'segments\' array on the top level!");
		process.exit(1);
	} else {
		console.log("Input file looks good, proceeding...");
	}

	let fields = ["start", "end", "speaker", "text"];

	const parser = new Parser({
		fields,
		formatters: {
		  string: trimStringFormatter()
		}
	});


	const csv = parser.parse(whisperJSON.segments);

	console.log(`Writing CSV output to ${argv.output}...`);
	fs.writeFile(argv.output, csv, err => {
	  if (err) {
		console.error(err);
	  }
	  // file written successfully
	});
	console.log("All done.");
})();