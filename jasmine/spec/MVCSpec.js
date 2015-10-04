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

  describe("View", function() {
    it("should be of type View", function(done) {
      expect(view.type).toEqual('View');
      expect(view instanceof MVC).toBe(true);
      expect(view instanceof View).toBe(true);
      done();
    });
    it("should have a 'ViewManager'", function() {
      expect(view.manager.name).toEqual('ViewManager');
    });
    it("should register an event", function() {
      view.registerEvent('TEST_VIEW');
      expect(view.manager.events.TEST_VIEW).toBeTruthy();
    });
    it("should publish an event", function() {
      spyOn(view.manager, 'publish');
      view.publish('TEST_VIEW');
      expect(view.manager.publish).toHaveBeenCalled();
    });
    it("should unregister an event", function() {
      view.unregisterEvent('TEST_VIEW');
      expect(view.manager.events.TEST_VIEW).toBeUndefined();
    });
  }); 

  describe("Controller", function() {
    it("should be of type Controller", function(done) {
      expect(controller.type).toEqual('Controller');
      expect(controller instanceof MVC).toBe(true);
      expect(controller instanceof Controller).toBe(true);
      done();
    });
    it("should have a 'ControllerManager'", function() {
      expect(controller.manager.name).toEqual('ControllerManager');
    });
    it("should register an event", function() {
      controller.registerEvent('TEST_CONTROLLER');
      expect(controller.manager.events.TEST_CONTROLLER).toBeTruthy();
    });
    it("should publish an event", function() {
      spyOn(controller.manager, 'publish');
      controller.publish('TEST_CONTROLLER');
      expect(controller.manager.publish).toHaveBeenCalled();
    });
    it("should unregister an event", function() {
      controller.unregisterEvent('TEST_CONTROLLER');
      expect(controller.manager.events.TEST_CONTROLLER).toBeUndefined();
    });
  }); 

  describe("Components", function() {
    var result = '';
    it("should transfer data through all other components", function(done) {
      // Register events:
      view.registerEvent('VC');
      controller.registerEvent('CM');
      model.registerEvent('MV');
      // Subscribe:
      controller.subscribeTo('view', 'VC', function(data) {
        controller.publish('CM', data[0]);
      });
      model.subscribeTo('controller', 'CM', function(data) {
        model.publish('MV', data[0]);
      });
      view.subscribeTo('model', 'MV', function(data) {
        result = data[0];
      });
      // Publish:
      view.publish('VC', 'value');
      expect(result).toBe('value');
      done();
    });
  });
});
