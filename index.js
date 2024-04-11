// ---- node.js built around concept of module, functionality store in module
// ---- fs stand for file system
// ---- sync stands for synchronous
// ---- ./ start at home folder (where index.js at, that's the dot)
// ---- ES6 -> template string (`${}`), declaring variable with const instead of var

// ---- fs module return object in which there r lots of func that can be used and restore into fd variable that can be used later
const fs = require("fs");

// FILE
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

// ---- error 1st callback is typical in node.js in case there was any
// ---- when this func is run, it will reading this file in bg without blocking the rest of code execution
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//     console.log(`${data}\t(2nd run callback after read start.txt is done)`);
// });
// console.log("Will read file\t(1st not get blocking by fs func)"); // not get blocked, show first while that func run in bg and when func finish will run thing in callback func

// ---- multiple step -----> !!!!! callback hell: callback in callback !!!!!
// ---- 1) fs func read file then store value into data1
// ---- 2) data1 used in callback of another func and store value in data2

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    if (err) return console.log("!!! ERROR !!!"); //callback error handle -> in case file path is not correct (try change into incorrect path)
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(`${data2}\t(2nd run callback after read start.text is done)`);
        fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
            console.log(`${data3}\t\t\t\t(3nd run callback after read read-test.txt is done)`);
            fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
                console.log("Your file has been written :D\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(4nd run callback after write final.txt is done)");
            });
        });
    });
});
console.log("Will read file\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(1st not get blocking by fs func)"); // not get blocked
