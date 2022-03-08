var S = require('string');
var ParserUtils = require('./ParserUtils');
var cheerio = require('cheerio');

exports.isKmartEmail = function(email) {
	// console.log(email.getFrom());
}

// should use 
// email.setName()
// email.setStreet()
// email.setTrackingNumber()
// email.setCarrier();
exports.getTrackerAndName = function(email){
	try {
		// takes the raw HTML of the email and loads it into a dom object
		var dom = cheerio.load(email.getRawHTMLAbstracted(), { decodeEntities: false});
		// you can then use standard CSS jQuery selectors to extract HTML notes
		// in this case I extract all <strong> objects that contain "Shipping Address" as a string
		var spanOverName = dom('strong:contains("Shipping Address")')['0'];
		//I use parser utils to climb up the HTML tree to the first TD node
		var containingTD = ParserUtils.climbUpTo(spanOverName, 'td');
		
		// For illustration purposes I'm grabbing the <strong> element containing the label "Shipping address" and log it
		// getChildOfType grabs the child element of certain kind at a certain index (in this case <strong> at index 0, i.e. the first <strong>)
		var labelStrong = ParserUtils.getChildOfType(containingTD, 'strong',  0)
		// here I use getTextChild to grab the text inside the strong
		var labelString = ParserUtils.getTextChild(labelStrong, 0).data
		console.log(labelString)
		

	} catch (e) {
		console.log('error with KMART email ' + email.mailId)
		console.log(e.stack);
	}
}
