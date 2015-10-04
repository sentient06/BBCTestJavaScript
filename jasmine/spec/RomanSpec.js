describe("Roman Numerals", function() {

  var controller;
  var NORMAL      = 1;
  var TRADITIONAL = 2;
  var MEDIEVAL    = 3;

  beforeEach(function(done) {
    setTimeout(function() {
      controller = new IndexController('controller');
      done();
    }, 1);
  });  

  it("should default to normal & zero", function(done) {
    expect(controller.getMethod()).toEqual(NORMAL);
    expect(controller.getNumber()).toEqual(0);
    expect(controller.getResult()).toEqual('nulla');
    done();
  });
  it("should set and get number and method", function(done) {
    controller.setNumber(769);
    controller.setMethod(TRADITIONAL);
    expect(controller.getNumber()).toEqual(769);
    expect(controller.getMethod()).toEqual(TRADITIONAL);
    done();
  });

  describe("should generate", function() {
    beforeEach(function() {
      controller.setNumber(769);
    });
    it("medieval numeral", function() {
      controller.setMethod(MEDIEVAL);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('PHOZI');
    });
    it("traditional numeral", function() {
      controller.setMethod(TRADITIONAL);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('DCCLXVIIII');
    });
    it("normal numeral", function() {
      controller.setMethod(NORMAL);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('DCCLXIX');
    });
    it("zero from negative number", function() {
      controller.setNumber(-2);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('nulla');
    });
  });

  describe("should", function() {
    it("round up a number with decimals", function() {
      controller.setNumber(10.99);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('XI');
    });
    it("round down a number with decimals", function() {
      controller.setNumber(10.4999999);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('X');
    });
    it("generate zero from negative number with decimals", function() {
      controller.setNumber(-10.4999999);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('nulla');
    });
    it("complain of big numbers", function() {
      controller.setNumber(1000000);
      controller.generateRomanNumeral();
      expect(controller.getResult()).toEqual('nimis magna!');
    });
  });

});
