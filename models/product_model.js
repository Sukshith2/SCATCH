const mongose = require('mongoose');


const productSchema =  mongose.Schema({
    image : String,
    productname : String,
    price : Number,
    discount : {
        type:Number,
        default : 0
    },
    bgcolour : String,
    panelcolour : Boolean,
    textcolour : String,
});


module.exports = mongose.model('product', productSchema);
