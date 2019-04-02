var fs = require('fs');
var fs2 = require("fs-extra");
var path = require('path');
var yaml = require('js-yaml');


var yamlwriter = function (file, optionSet, isExternalSet) {
    try {       
        var doc;
        var input = optionSet;

        // Load yaml file to edit
        if (fs.existsSync(file)) {
            doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        } else {
            console.log("No file found, new document created.")
            doc = {};
        }

        // Load option set (from external file)
        if(!isExternalSet) {
            console.log("Options loaded: " + optionSet + "\r\n")
        } else {
            if(fs.existsSync(optionSet)) {
                console.log("Options file loaded: " + optionSet + "\r\n")
                var input = fs.readFileSync(optionSet, 'utf8');
            }
        } 
        console.log("Input to process: \n--------------\n" + input + "\n--------------\n");


        // Process input and write to file
        var splitted = input.split(',');

        for (let item of splitted) {
            if(item.indexOf('=')==-1){
                break;
            }
            var splitEquals = item.split("=");

            var splitItem = splitEquals[0].split('.');
           
            var base = doc;

            for (let pathItem of splitItem) {
                
                pathItem = pathItem.trim();
                
                if (pathItem == splitItem[splitItem.length - 1]) {
                    break;
                }

                let item = base[pathItem];
                if (!item) {

                    base[pathItem] = {};
                }
                base = base[pathItem];
            }
            var lProc = "doc." + item;
            eval(lProc);
        }

        return yaml.safeDump(doc);
    } catch (e) {
        console.log(e);
    }
}

module.exports = yamlwriter;

