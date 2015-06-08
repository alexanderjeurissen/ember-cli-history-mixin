import Ember from 'ember';
import RouteHistoryMixin from 'ember-cli-history-mixin/mixins/route-history';
import ParentRouteMixin from 'ember-cli-history-mixin/mixins/parent-route';

export default Ember.Route.extend(RouteHistoryMixin, ParentRouteMixin, {});
