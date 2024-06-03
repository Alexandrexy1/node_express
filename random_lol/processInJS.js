const process = require('process');


console.log(process.argv); // returns an array containing the command-line arguments
console.log(process.cwd()); // returns current directory
console.log(process.env); // returns an object containing the user environment

console.log("What is your name? ");
process.stdin.on("data", (anything) => {
    process.stdout.write(`user name: ${anything}`);
    process.exit();
}); // input and output