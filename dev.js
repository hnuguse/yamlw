var yamlwriter = require('./yamlw');

var set="A-Team"
var result = yamlwriter("samples/sample.yml", true, set, false, true);

console.log(result);
