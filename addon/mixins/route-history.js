import Ember from "ember";
import Transition from '../models/transition';

export default Ember.Mixin.create({
  backRoutes: Ember.A(),
  forwardRoutes: Ember.A(),
  currentPath: null,
  activeRoute: Ember.computed('currentPath', function () {
    var transition = Transition.create({
      targetRoute: this.get('currentPath')
    });

    if (this.get('isSingleResource')) {
      var model = this.modelFor(this.get('currentPath'));
      if (Ember.isPresent(model)) {
        transition.set('params', model.get('slug') || model.get('id'));
      }
    }

    return transition;
  }),
  currentTransition: null,

  isUntrackedRoute: Ember.computed.match('currentPath', /\w+.edit\b|\w+.new\b|loading\b/),
  isSingleResource: Ember.computed.match('currentPath', /(?:^(?!.*s\b))(?:^(?!index)).*$/),
  isTransitioning: false,

  observeRouteChanges: Ember.observer('currentPath', function () {
    if (this.get('isUntrackedRoute')) {
      return false;
    }

    this.get('backRoutes').pushObject(this.get('activeRoute'));

    if (!this.get('isTransitioning')) {
      this.get('forwardRoutes').length = 0;
    } else {
      this.set('isTransitioning', false);
    }
  }),

  getForwardRoute: function () {
    return this.get('forwardRoutes').popObject() || this.get('activeRoute');
  },

  getBackRoute: function () {
    if (!this.get('isUntrackedRoute')) {
      this.get('backRoutes').popObject();
    }

    return this.get('backRoutes').popObject() ||
      Transition.create({
        targetRoute: 'index'
      });
  },

  saveActiveRoute: function (destination) {
    if (!this.get('isUntrackedRoute') && this.get(destination)) {
      this.get(destination).pushObject(this.get('activeRoute'));
    }
  },

  prepareTransition: function (direction) {
    this.set('isTransitioning', true);
    if (direction === 'BACK') {
      this.saveActiveRoute('forwardRoutes');
    } else if (direction === 'FORWARD') {
      this.saveActiveRoute('backRoutes');
    }
  },

  executeTransition: function (transition) {
    if (transition.get('isSingleResource')) {
      this.get('controller').transitionToRoute(
        transition.targetRoute,
        transition.params
      );
    } else {
      this.get('controller').transitionToRoute(transition.targetRoute);
    }
  },
  actions: {
    didTransition: function () {
      if (Ember.isPresent(this.get('currentTransition'))) {
        this.set('currentPath', this.get('currentTransition'));
      } else {
        Ember.run.scheduleOnce('routerTransitions', this, function () {
          this.set('currentPath', this.get('controller.currentPath'));
        });
      }
      this.set('currentTransition', null);
    },

    willTransition: function (transition) {
      this.set('currentTransition', transition.targetName);
    },

    goBack: function () {
      this.prepareTransition('BACK');
      var transition = this.getBackRoute();
      this.executeTransition(transition);
    },
    goForward: function () {
      this.prepareTransition('FORWARD');
      var transition = this.getForwardRoute();
      this.executeTransition(transition);
    }
  }
});

