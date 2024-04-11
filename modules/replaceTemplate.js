//node.js every file is treated as a module 

//for replace product in JSON to HTML template
//anonymous func cuz dont have name now
module.exports = (temp, product) => {
    let output = temp.replace(/{%ID%}/g, product.id);

    // output variable for replace product in temp
    // not good practice if directly manipulate the argument that pass into func
    output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%PRODUCTNUTRIENTNAME%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);

    // HTML class of not display organic
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    return output;
};
