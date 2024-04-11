// ---- node.js built around concept of module, functionality store in module
// ---- fs stand for file system
// ---- sync stands for synchronous
// ---- ./ start at home folder (where index.js at, that's the dot)
// ---- ES6 -> template string (`${}`), declaring variable with const instead of var

// ---- this module(fs) get access to func reading/writing data right to the fs
// ---- fs module name return object in which there r lots of func that can be used and restore into fd variable that can be used later
const fs = require("fs");

// ==================================
//   Blocking ---> Synchronous way
// ==================================

// ---- readFileSync is sync ver of file reading
// ---- takes 2 arg -> fs.readFileSync(<file_path_for_read>, <character_encoded>)
// ---- this fuc reads data from the file and returns it stored in a variable
// const textIn = fs.readFileSync("./txt/input.txt", "utf8");
// console.log(textIn);

// ---- writeFileSync is sync ver of file writing
// ---- takes 2 arg -> fs.writeFileSync(<file_path_for_write>, <variable(txt)_for_write>);
// ---- before ES6 -> 'this is waht we know about the' + textIn
// const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

// ---- node.js built around callback -> callback function
// ---- do work in bg as soon as it ready(finish), will start callback function that specified

// ======================================
//   Non-blocking ---> Asynchronous way
// ======================================

// error 1st callback is typical in node.js in case there was any
// when this func is run, it will reading this file in bg without blocking the rest of code execution
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
    console.log(`${data}\t(2nd run callback specified after fs func is done)`);
});
console.log("Will read file\t(1st not get blocking by fs func)"); // not get blocked, show first while that func run in bg and when func finish will run thing in callback func
