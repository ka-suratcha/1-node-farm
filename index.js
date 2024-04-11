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

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     if (err) return console.log("!!! ERROR !!!"); //callback error handle -> in case file path is not correct (try change into incorrect path)
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(`${data2}\t(2nd run callback after read start.text is done)`);
//         fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//             console.log(`${data3}\t\t\t\t(3nd run callback after read read-test.txt is done)`);
//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
//                 console.log("Your file has been written :D\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(4nd run callback after write final.txt is done)");
//             });
//         });
//     });
// });
// console.log("Will read file\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(1st not get blocking by fs func)"); // not get blocked

// SERVER
// ---- open browser with ip as URL --> did req by hitting url --> callback func run

// ---- 1) create server and running server
// ---- 2) create listener to listen to incoming request from client
// ---- app isnt stop cuz -> event loop

// ROUTING
// ---- implementing different action for different URLs

// API
// ---- service, can request some data (ex. data that user wants to req is data about product that v r offering)
// ---- data is what API will send to client when req

// DYNAMIC WEBSITE
// ---- building the template that hold actual data
// ---- change data, web update on the site

//      HTML SIDE
// ---- 1) build template for each page with placeholder
// ---- 2) replace placeholder with real data with code

//      CODE SIDE
// ---- 1) read template file in the beginning of code
// ---- 2) replace with code

// ---- http module get networking capabilites, build http server
const http = require("http");

// ---- URL module can pass some variable from URL
const url = require("url");

// ---- http.createServer accept callback func, "start each time new req hits server" (callback func get called) ***
// ---- callback get access to -> req object: detail about request (ex. data)
//                             -> res object: tool for dealing with res
// ---- save result of createServer method in to variable of create listener
// ---- header and stats code always need to be sent before send that res
// ---- Express -> npm tool for do routing
// ---- re.writeHead(<status_code>, <header>) -> send header
// ---- Header -> piece of info about res that sending back (to inform ex. content type)
// ---- JSON -> simple text format looks like JS obj which can have array
// ---- dot (./) -> dir from v run the node cmd in tml
// ---- __dirname refer dir for that script
// ---- res.end() -> send String

// y use sync ver to read file? -> top level code only executed once (code actually start), right in the beginning, use sync ver and its easier to handle that data
// more efficient -> data only be readed once in the beginning not in callback which get executed everytime when new req coming
// replace() g flag -> change all not just first one (act like replaceAll())

// export our own module
const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); //JSON (String) -> JS (object/array) "JS format" this get arrat of data

// read template at top-level code (read once)
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

//get executed each time when new req coming, not top level code
// ---- http.createServer -> create web server on ur computer
const server = http.createServer((req, res) => {
    console.log(req.url); //print whole url
    console.log(url.parse(req.url, true));

    //get(parse) url detail query(id) and pathname(url)
    //true -> to parse query(url) into object (query string)
    const { query, pathname } = url.parse(req.url, true); // store url detail from req

    // check url and sent differect res

    //OVERVIEW PAGE
    if (pathname === "/overview" || pathname === "/") {
        // loop through dataObj(array) and replace the placeholder im template with data
        res.writeHead(200, {
            "Content-type": "text-html",
        });

        // store cards that already be replace with data from dataObj
        // .return as array -> use join() to connect it (change to String)
        const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join();

        // replace card in overview template
        const overviewPage = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
        res.end(overviewPage); //send overview temp that already placed all data

        //PRODUCT PAGE
    } else if (pathname === "/product") {
        console.log(query);

        //get id from url as index to get that data element
        const product = dataObj[query.id];

        // replace data to product temp
        const output = replaceTemplate(tempProduct, product);
        res.end(output); //send product temp that already placed all data

        //API
    } else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        console.log(dataObj);
        res.end(data);

        // NOT FOUND PAGE
    } else {
        res.writeHead(404, {
            "Content-type": "text-html", //server expect HTML
            "my-own-header": "hello wolrd",
        });
        res.end("<h1> Page not found! </h1>"); //try sending HTML
    }
});

// ---- server.listen -> create listener (variable that store server to create listener)
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to req on port 8000"); // run as soon as server start listening (server is created and start listening request)
});
