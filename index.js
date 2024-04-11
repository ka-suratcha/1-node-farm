// node.js built around concept of module, functionality store in module
// fs stand for file system
// sync stands for synchronous
// ./ start at home folder (where index.js at, that's the dot)
// ES6 -> template string (`${}`), declaring variable with const instead of var

// this module(fs) get access to func reading/writing data right to the fs
// fs module name return object in which there r lots of func that can be used and restore into fd variable that can be used later
const fs = require("fs");

// readFileSync is sync ver of file reading
// takes 2 arg -> fs.readFileSync(<file_path_for_read>, <character_encoded>)
// this fuc reads data from the file and returns it stored in a variable
const textIn = fs.readFileSync("./txt/input.txt", "utf8");
console.log(textIn);

// writeFileSync is sync ver of file writing
// takes 2 arg -> fs.writeFileSync(<file_path_for_write>, <variable(txt)_for_write>);
// before ES6 -> 'this is waht we know about the' + textIn
const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");
