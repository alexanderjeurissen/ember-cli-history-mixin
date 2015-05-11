import Ember from 'ember';
import Post from '../models/post';

export default Ember.Route.extend({
  model: function () {
    return this.store.findAll('post');
  }
});

