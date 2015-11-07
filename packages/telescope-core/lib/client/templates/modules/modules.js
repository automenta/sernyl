Template.modules.helpers({
  isDebug: function () {
    return Session.get('debug');
  },
  getClass: function () {
    var zoneClass = "zone-wrapper ";
    if (this.zoneClass) {
      zoneClass += this.zoneClass;
    } else {
      zoneClass += this.zone;
    }
    return zoneClass;
  },
  getId: function () {
    return this.wrapperId;
  },
  getModules: function () {
    var modules = this;

    var zoneModules = Telescope.modules.get(modules.zone).map(function (module) {

      // use deep copy to avoid modifying original module when extending it with modules property
      var newModule = jQuery.extend(true, {}, module);
      newModule.modules = modules;
      return newModule;

    });

    return zoneModules;
  },
  showModule: function () {
    var module = this;

    // if module should only run on specific routes, test for them
    var only = module.only;
    if (only) {
      if (Array.isArray(only)) {
        return _.contains(only, FlowRouter.getRouteName());
      } else {
        return only();
      }
    }

    // if module should *not* run on specific routes, test for them
    var except = module.except;
    if (except) {
      if (Array.isArray(except)) {
        return !_.contains(except, FlowRouter.getRouteName());
      } else {
        return except();
      }
    }

    return true;
  },
  moduleData: function () {
    var m = this.modules;
    return _.extend({
      zone: m.zone,
      moduleClass: m.moduleClass
    }, m.moduleData);
  }
});
