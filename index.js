const fs = require("fs");
const dataPath = "./data/code.json";
const programFunctions = {
    sortArrayAlphabetically: (array) => { // sorts array alphabetically
        return array.sort((a, b) => {
            return a.localeCompare(b);
        });
    },
    savedCode: [],
    populateSavedCodeArray: (jsonData) => {
        console.log(jsonData);
        let jsonArray = Object.entries(jsonData).map(([key, value]) => `${key}: ${value}`);
        for(let i = 0; i < jsonArray.length; i++) { programFunctions.savedCode.push(jsonArray[i]); }
        programFunctions.savedCode = programFunctions.sortArrayAlphabetically(programFunctions.savedCode);
    },
    createJson: () => {
        let tempData = {};
        fs.writeFile(dataPath, JSON.stringify(tempData), (err) => {
            if (err) { console.log("Unable to create file to save code."); }
        });
    },
    retrieveJSON: () => { // calls retrieve immediately
        fs.readFile(dataPath, (err, data) => {
            if (err) { programFunctions.createJson(); } // if error, create json
            else { // if no error, populate saved code array
                programFunctions.populateSavedCodeArray(JSON.parse(data));
            }
         });
    },
    saveCode: (code) => {
        // console.log(code);
        // let codeFunction = code.method;
        // let codeActivate = eval(`(${codeFunction})`)
        // codeActivate();
        programFunctions.savedCode.push(code);
    }
}
// programFunctions.retrieveJSON();


const codeSaver = {
    save: (code, description) => {
        let userFunction = {
            name: code.name,
            method: code.toString(),
            desc: description
        }
        console.log(userFunction);
        programFunctions.saveCode(userFunction);
    },
    get: (code) => {
        return eval(`(${code})`);
    }
}

// function myCode() {
//     console.log("yadayadayada");
// }

// codesaver.save(myCode, "displays my code");

module.exports = codeSaver;