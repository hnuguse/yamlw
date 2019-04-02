var yamlwriter = require('./yamlw');

var optionSet = "samples/A-Team";
var toFile = "samples/sample.yml";
var isExternalSet = true;

var result = yamlwriter(toFile, optionSet, isExternalSet);

console.log("Output: \n--------------\n" + result + "--------------\n");
