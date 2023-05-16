const fs = require("fs");
const programFunctions = {
    createJson: () => {
        let tempData = {};
        fs.writeFile("./data/code.json", tempData, (err) => {
            if (err) { console.log("Unable to create file to save code."); }
        });
    },
    retrieveJSON: () => { // calls retrieve immediately
        fs.readFile("./data/code.json", (err, data) => {
            if (err) { programFunctions.createJson(); } // if error, create json
            else { // if no error, populate array and convert to object

            }
         });
    },
    sortJSONAlphabetically: () => {

    },
    savedCode: []
}

const codesaver = {
    save: (code, functionName) => {

    },
    get: (code) => {

    },

}

module.exports = codesaver;