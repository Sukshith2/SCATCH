const mongose = require('mongoose');



const usersSchema =  mongose.Schema({
    name : String,
    email : String,
    password : String,
    contact : Number,
    cart : {
        type : Array,
        default : []
    },
    orders : {
        type : Array,
        default : []
    },
    isadmin : Boolean,
    picture : String,
});


module.exports = mongose.model('userData', usersSchema);
