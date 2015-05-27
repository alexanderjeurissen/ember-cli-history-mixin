import Ember from "ember";

export default Ember.Object.extend({
  targetRoute: null,
  params: null,
  isSingleResource: Ember.computed.match(
    'targetRoute',
    /(?:^(?!.*s\b))(?:^(?!index)).*$/
  ),
  hasParams: Ember.computed.bool('params')
});

