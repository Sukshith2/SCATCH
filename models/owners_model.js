const mongose = require('mongoose');

const ownerSchema =  mongose.Schema({
    name : String,
    email : String,
    password : String,
    contact : Number,
    picture : String,
    product : {
        type: Array,
        default : [],
    },
    gstn : String,
});


module.exports = mongose.model('ownerData', ownerSchema);
