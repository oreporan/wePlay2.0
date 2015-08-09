// Users

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: {type : String, required : true },
    _id: {type : String, required : true },
    leagues: [{ type: String, minlength : 3 }],
    date: { type: Date, default: Date.now },
    attending: { type: Number, min: -1, max: 1 , default : 0},
});

module.exports = mongoose.model('User', UserSchema);
