// User

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: {type : String, required : true },
    _id: {type : String, required : true },
    leagues: [{ type: String, minlength : 3 }],
    dateCreated: { type: Date, default: Date.now },
    attending: { type: Number, min: -1, max: 1 , default : 0},
});

module.exports.User = mongoose.model('User', UserSchema);


// Game

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema   = new Schema({
    LeagueId : {type : String, required: true},
 //   users : [{ type : UserSchema , min: 2 , max : 25 }],
    dateCreated: { type: Date, default: Date.now },
    teamA : [UserSchema],
    teamB : [UserSchema],
    invites : [UserSchema]
});

module.exports.Game = mongoose.model('Game', GameSchema);



// League

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LeagueSchema   = new Schema({
    name: {type : String, required : true },
    _id: {type : String, required : true },
    users: [UserSchema],
    dateCreated: { type: Date, default: Date.now },
    startDate: { type: Date, default: Date.now },
    endDate: {type: Date, default: Date.now},
    games: [GameSchema]

});

module.exports.League = mongoose.model('League', LeagueSchema);
