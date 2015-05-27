import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function () {
  this.route('/');
  this.resource('posts');
  this.resource('post', {
    path: '/post/:post_id'
  });
  this.route('info');
  this.route('about');
});

