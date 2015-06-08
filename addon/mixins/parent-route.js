import Ember from "ember";

export default Ember.Mixin.create({
  fetchParentRoute: function () {
    var Routes = Ember.A(this.router.router.currentHandlerInfos);
    var currentRouteName = this.get('controller.currentRouteName');
    var currentRoute = Routes.findBy('name', currentRouteName);
    var currentRouteIndex = Routes.indexOf(currentRoute);
    var parentRoute = Routes[currentRouteIndex - 1];
    var ROUTE = 0, MODEL = 1;

    var targetRoute = [2];
    targetRoute[ROUTE] = parentRoute.name;
    targetRoute[MODEL] = parentRoute.context;

    if (currentRoute.name.match(/\w+\.index/) &&
      targetRoute[ROUTE] === currentRoute.name.split('.')[0]) {
      targetRoute[ROUTE] = Ember.Inflector.inflector.pluralize(
        targetRoute[ROUTE]
      );
      targetRoute.splice(MODEL, 1);
    } else if (Ember.isBlank(targetRoute[MODEL])) {
      targetRoute.splice(MODEL, 1);
    }

    return targetRoute;
  },

  actions: {
    goToParentRoute: function () {
      this.get('controller').transitionToRoute.apply(
        this.get('controller'),
        this.fetchParentRoute()
      );
    }
  }
});

