const mongose = require('mongoose');



const usersSchema =  mongose.Schema({
    name : String,
    email : String,
    password : String,
    contact : Number,
    cart : [
        {
        type : mongose.Schema.Types.ObjectId,
        ref : "products"
    }
],
    orders : {
        type : Array,
        default : []
    },
    picture : String,
});


module.exports = mongose.model('userData', usersSchema);
