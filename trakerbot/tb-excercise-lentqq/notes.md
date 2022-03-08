Zada4ka:
Step 1. Implement the KmartHandler.isKmartEmail function to return true when an email is from Kmart and false when it is from Walmart

Step 2. Expand the getTrackerAndName() function to extract the tracking number and carrier, as well as the name and "street" (address) from the Kmart Emails

Hints:
Izpolzvme node 10.14.2
Az li4no go instaliram prez nvm, no koeto e nai lesno


To run tests:

npm install
npm test



testa se namira v test/unit/kmart
check out src/ParserUtils.js for an API for traversing the HTML nodes

open temp.html za da vidi6 kak izglejda emaila

ako iska6 da printira6 nqkoi ot drugite emaili (te se namirat v test/assets/), izpolzvai printEmail, prosto smeni path-a vutre

node printEmail.js > temp2.html
open temp2.html



