// Utility methods

module.exports.convertPlayerRatingToNumber = function(ratingInLetter) {
	var ratingArray = ["A" , "B" , "C" , "D"];
	return ratingArray.indexOf( ratingInLetter ) + 1 ;
}

module.exports.convertGameFrequencyToCounter = function ( dateToCountFrom , gameFrequency) {
	
}