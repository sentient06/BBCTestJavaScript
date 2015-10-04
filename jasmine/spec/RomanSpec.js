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

});
