const assert = require('assert');
const fs = require('fs');
const S = require('string');

let KmartHandler = require('../../src/KmartHandler');
let EMail = require('../../src/EMail');

let am = JSON.parse(fs.readFileSync('test/assets/kmart.json'));
let email = new EMail(am);
let am2 = JSON.parse(fs.readFileSync('test/assets/kmart2.json'));
let email2 = new EMail(am2);
let am3 = JSON.parse(fs.readFileSync('test/assets/kmart3.json'));
let email3 = new EMail(am3);
let am4 = JSON.parse(fs.readFileSync('test/assets/kmart4.json'));
let email4 = new EMail(am4);
let amWalmart = JSON.parse(fs.readFileSync('test/assets/walmart.json'));
let emailWalmart = new EMail(amWalmart);


describe('#validity', function() {
  it('should return true when asked if Kmart email', function() {
    assert.equal(true, KmartHandler.isKmartEmail(email));
  });
  it('should return true when asked if Kmart email', function() {
    assert.equal(true, KmartHandler.isKmartEmail(email4));
  });
  it('should return false when asked if Kmart email', function() {
    assert.equal(false, KmartHandler.isKmartEmail(emailWalmart));
  });
});

describe('#getTrackerAndName', function() {
  KmartHandler.getTrackerAndName(email);
  it('name should be Emma Sartin', function(){
    assert.equal('Emma Sartin', email.name);
  });
  it('street should be 1741saint Louis st. Apt a', function(){
    assert.equal('1741saint Louis st. Apt a', email.street);
  });
  it('tracking number should be 1Z0224FE0300010616', function(){
    assert.equal('1Z0224FE0300010616', email.trackingNumber);
  });
  it('carrier should be UPS', function(){
    assert.equal('UPS', email.carrier);
  });
  
});



describe('#getTrackerAndName2', function() {
  KmartHandler.getTrackerAndName(email2);
  it('name should be Julie Posey', function(){
    assert.equal('Julie Posey', email2.name);
  });
  it('street should be 124 Royal Park Ln', function(){
    assert.equal('124 Royal Park Ln', email2.street);
  });
  it('tracking number should be 1ZY463X00300037199', function(){
    assert.equal('1ZY463X00300037199', email2.trackingNumber);
  });
  it('carrier should be UPS', function(){
    assert.equal('UPS', email2.carrier);
  });
});
