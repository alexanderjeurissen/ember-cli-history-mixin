import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function () {
  this.route('/');
  this.resource('posts');
  this.resource('post', {path: '/posts/:post_id'}, function() {
    this.route('edit');
  });

  this.route('info');
  this.route('about');
});

