const mongose = require('mongoose');


const productSchema =  mongose.Schema({
    image : Buffer,
    productname : String,
    price : Number,
    discount : {
        type:Number,
        default : 0
    },
    bgcolour : String,
    panelcolour : String,
    textcolour : String,
});


module.exports = mongose.model('products', productSchema);
