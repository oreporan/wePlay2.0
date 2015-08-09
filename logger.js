// This class holds messages to log

module.exports.init = function( className ) {
	return {
		audit : function(mn, message) {
			console.log('[INFO] ' + buildRootMessage(className, mn) + message);
		},
		warn : function(mn , message ) {
			console.warn( '[WARN] ' +  buildRootMessage(className, mn) + message );
		},
		error : function(mn , message ) {
			console.error ( '[ERROR] ' + buildRootMessage(className, mn) + message );
		}
	}
};

function buildRootMessage ( className , methodName) {
	return '[' +className+ '.' + methodName + '] ';
};