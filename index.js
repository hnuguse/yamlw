// Example usage
// Add variables from the samples/A-Team file to the samples/sampl.yml file:
// node index.js -f samples/sample.yml -s samples/A-Team -e

var program = require('commander');
var yamlwriter = require('./yamlw');

program
    .version('0.1.0')
    .option('-f, --file [file]', 'The file to load or create')
    .option('-s, --set [options]', 'Variables to set: String with comma seperated - e.g. "variables.BuildConfiguration=Release,build=true" or  enter a File and set the -e or --external flag')
    .option('-e, --external','Load external options file')

    .parse(process.argv);

if (!program.file) {
    console.log("Please pass in a file with the -f or --file argument");
    process.exit(1);
}

if (!program.set) {
    console.log('Please pass in variables with the -s or --set argument. Variables to set separated by commas - e.g. "build=true,system.image.version=12"');
    process.exit(1);
}

var file = program.file;
var set = program.set;
var external = program.external

var result = yamlwriter(file, set, external);

console.log(result);