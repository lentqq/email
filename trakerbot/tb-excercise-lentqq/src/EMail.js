'use strict'
var S = require('string');

module.exports = class EMail{
	constructor(go){
		this.gmailObject = go;
		this.mailId = go.id;
		this.receive_time = go.internalDate;
	}

	getSubject(){
		if (this.subject) {
			return this.subject;
		}
		else{
			for (var i = this.gmailObject.payload.headers.length - 1; i >= 0; i--) {
				if (this.gmailObject.payload.headers[i].name == 'Subject') {
					this.subject = this.gmailObject.payload.headers[i].value;
					return this.subject;
				}
			};
		}
		return false;
	}

	getFrom(){
		if (this.from) {
			return this.from;
		}
		else{
			for (var i = this.gmailObject.payload.headers.length - 1; i >= 0; i--) {
				if (this.gmailObject.payload.headers[i].name == 'From') {
					this.from = this.gmailObject.payload.headers[i].value;
					return this.from;
				}
			}
		}
		return false;
	}

	getTo(){
		if (this.to) {
			return this.to;
		}
		else{
			if (!this.gmailObject || !this.gmailObject.payload || !this.gmailObject.payload.headers) {
				return 'RESENDER';
			}
			for (var i = this.gmailObject.payload.headers.length - 1; i >= 0; i--) {
				if (this.gmailObject.payload.headers[i].name == 'To') {
					this.to = this.gmailObject.payload.headers[i].value;
					// "barak.landau@outlook.com" <barak.landau@outlook.com>
					if (S(this.to).contains('<') && S(this.to).contains('>')) {
						this.to = S(this.to).between('<', '>').trim().s;
					}
					return this.to;
				}
			}
		}
		return false;
	}

	getRaw(){
		if (this.raw) {
			return this.raw;
		}
		else{
			if (this.gmailObject.payload.parts) {
					this.raw = this.getRawFromParts(this.gmailObject.payload.parts);
			} else {
				if (this.gmailObject.payload.body.data) {
					var buf = new Buffer(this.gmailObject.payload.body.data, 'base64');
					this.raw = buf.toString();
				} else {
					this.raw = '';
				}
			}
			return this.raw;
		}
	}

	getRawHTMLAbstracted(){
		var out = this.getRawHTML();
		if (out.length > 5) {
			return out;
		} else {
			return this.getRaw();
		}
	}

	getRawHTML(){
		var parts = this.gmailObject.payload.parts;
		var out = '';
		if (parts && parts.length) {
			for (var i = 0; i < parts.length; i++) {
				if (parts[i].mimeType == 'text/html' && parts[i].body.data) {

					var buf = new Buffer(parts[i].body.data, 'base64');
					out += buf.toString();
				}
			}
		}
		return out;
	}

	getRawFromParts(parts){
		var out = '';
		var isWalmart = true;
		for (var i = 0; i < parts.length; i++) {
			if (parts[i].mimeType == 'text/plain' && parts[i].body.data) {
				isWalmart = false;
				var buf = new Buffer(parts[i].body.data, 'base64');
				out += buf.toString();
			}
			if(parts[i].parts){
				isWalmart = false;
				out += this.getRawFromParts(parts[i].parts);
			}
		}
		//wallmart doesnt include text/plain parts...
		if (isWalmart) {
			for (var i = 0; i < parts.length; i++) {
				if (parts[i].mimeType == 'text/html' && parts[i].body.data) {
					var buf = new Buffer(parts[i].body.data, 'base64');
					out += buf.toString();
				}
			}
		}
		return out;
	}

	setTo(t){
		this.to = t;
	}

	setURL(u){
		this.url = u;
	}

	setURLText(u){
		this.urlText = u;
	}

	setOrderNumber(o){
		this.orderNumber = o;
	}

	setAddressId(a){
		this.AddressId = a;
	}

	setTrackingNumber(n){
		this.trackingNumber = n;
	}

	setName(n){
		this.name = n;
	}

	setType(t){
		this.type = t;
	}

	setCarrier(c){
		this.carrier = c;
	}

	setStreet(s){
		this.street = s;
	}

	setNotificationId(n){
		this.NotificationId = n;
	}

	printObject(){
		console.log(this.gmailObject);
	}

	setZip(z){
  	this.zip = z;
	}

	prettyPrint(){
		console.log(this.from);
		console.log(this.subject);
		console.log(this.name);
		console.log(this.carrier);
		console.log(this.trackingNumber);
		console.log();
	}
}
