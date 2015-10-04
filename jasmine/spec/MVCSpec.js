describe("MVC", function() {

  var model;
  var view;
  var controller;

  beforeEach(function(done) {
    setTimeout(function() {
      model      = new Model('model');
      view       = new View('view');
      controller = new Controller('controller');
      done();
    }, 1);
  });  

  describe("Model", function() {
    it("should be of type Model", function(done) {
      expect(model.type).toEqual('Model');
      expect(model instanceof MVC).toBe(true);
      expect(model instanceof Model).toBe(true);
      done();
    });
    it("should have a 'ModelManager'", function() {
      expect(model.manager.name).toEqual('ModelManager');
    });
    it("should register an event", function() {
      model.registerEvent('TEST_MODEL');
      expect(model.manager.events.TEST_MODEL).toBeTruthy();
    });
    it("should publish an event", function() {
      spyOn(model.manager, 'publish');
      model.publish('TEST_MODEL');
      expect(model.manager.publish).toHaveBeenCalled();
    });
    it("should unregister an event", function() {
      model.unregisterEvent('TEST_MODEL');
      expect(model.manager.events.TEST_MODEL).toBeUndefined();
    });
  });
});
