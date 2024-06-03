const fs = require('fs');

fs.writeFile("text.txt", "Hello!\n", error => console.log(error)); // create or recreate the file

fs.appendFile("text.txt", "Hello!\n", error => console.log(error)); // sending text to the same file without recreating it

fs.rename("text.txt", "otherText.txt", error => console.log(error)); // rename the file

fs.unlink("otherText.txt", error => console.log(error)); // delete the file
