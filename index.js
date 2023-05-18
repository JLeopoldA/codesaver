const fs = require("fs");
const dataPath = "./data/code.json";
const programFunctions = {
    codeStorage: {
        savedCode: []
    },
    sortArrayAlphabetically: (array) => { // sorts array alphabetically
        // return array.sort((a, b) => {
        //     return a.name.localeCompare(b.name);
        // });
    },
    populateSavedCodeArray: (jsonData) => {
        console.log(jsonData);
        let jsonArray = Object.entries(jsonData).map(([key, value]) => `${key}: ${value}`);
        for(let i = 0; i < jsonArray.length; i++) { 
            programFunctions.codeStorage.savedCode.push(jsonArray[i]); 
        }
        console.log(programFunctions.codeStorage.savedCode);
        // programFunctions.codeStorage.savedCode = programFunctions.sortArrayAlphabetically(programFunctions.codeStorage.savedCode);
    },
    createJson: () => { // is called if an error occurs when trying to retrieve code.json
        let tempData = {};
        fs.writeFile(dataPath, JSON.stringify(tempData), (err) => {
            if (err) { console.log("Unable to create file to save code."); }
        });
    },
    retrieveJSON: () => { // calls retrieve immediately
        fs.readFile(dataPath, (err, data) => {
            if (err) { programFunctions.createJson(); } // if error, create json
            else { // if no error, populate saved code array
                // programFunctions.populateSavedCodeArray(JSON.parse(data));
                programFunctions.codeStorage.savedCode = JSON.parse(data);
                console.log(programFunctions.codeStorage.savedCode);
            }
         });
    },
    storeJSON: () => { // store savedCode array in JSON
        fs.writeFile(dataPath, JSON.stringify(programFunctions.codeStorage.savedCode), (err) => {
            if (err) { console.log("Unable to save code to file."); }
            else { // call retrieve json to repopulate the saved code array
                programFunctions.retrieveJSON();
            }
        });
    },
    storeMethod: (method) => { // store user chosen function
        // console.log(code);
        // let codeFunction = code.method;
        // let codeActivate = eval(`(${codeFunction})`)
        // codeActivate();
        console.log(method);
        programFunctions.codeStorage.savedCode.push(method);
        programFunctions.storeJSON();
        // console.log(programFunctions.savedCode);
    }
}
// programFunctions.retrieveJSON();


const codeSaver = {
    save: (code, description) => {
        programFunctions.retrieveJSON(); // retrieve saved functions
        let userFunction = {
            name: code.name,
            method: code.toString(),
            desc: description
        }
        programFunctions.storeMethod(userFunction);
    },
    get: (methodName) => {
        programFunctions.retrieveJSON(); // retrieve saved functions
        const desiredMethod = programFunctions.codeStorage.savedCode.forEach(element => {
            console.log(element);
            if (element.name == methodName) {
                return element;
            }
        });
        if (desiredMethod) {
            console.log(desiredMethod);
        } else {
            console.log("unable to retrieve");
        }
        // return eval(`(${code})`);
    }
}

// function myCode() {
//     console.log("yadayadayada");
// }

// codesaver.save(myCode, "displays my code");

module.exports = codeSaver;