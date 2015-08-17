
module.exports.users = {
	dBUserSavedMessage : function( clientId ) {
		return { clientId : clientId , responseText : "User was saved" , success : true}
	},
	dbErrorMessage : function(error, description) {
		return { error : error , description : description , success : false};
	}
};