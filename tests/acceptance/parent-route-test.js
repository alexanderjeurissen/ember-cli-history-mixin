/* jshint expr:true */
import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module('parentRoute integration specs', {
  beforeEach: function () {
    App = startApp();
    visit('/');
  },

  afterEach: function () {
    Ember.run(App, 'destroy');
  }
});

test('goBack to `index` from `posts`', function (assert) {
  visit('/posts');
  click('button#goBackToParentBtn');

  andThen(function () {
    assert.equal(currentRouteName(), 'index');
  });
});

test('goBack to `posts` from `post.index`', function (assert) {
  visit('/posts/1');
  click('button#goBackToParentBtn');

  andThen(function () {
    assert.equal(currentRouteName(), 'posts');
  });
});

test('goBack to `post.index` from `post.edit`', function (assert) {
  visit('/posts/1/edit');
  click('button#goBackToParentBtn');

  andThen(function () {
    assert.equal(currentRouteName(), 'post.index');
  });
});

test('when transitioning back from `posts` to `index`', function (assert) {
  visit('/');
  click('a:contains("posts")');
  click('button#goBackToParentBtn');
  andThen(function () {
    assert.equal(currentRouteName(), 'index');
  });
});

test('when transitioning back from `post.index` to `posts`', function (assert) {
  visit('/');
  click('a:contains("posts")');
  click('a:contains("First")');
  click('button#goBackToParentBtn');
  andThen(function () {
    assert.equal(currentRouteName(), 'posts');
  });
});

test('when transitioning back from `post.edit` to `post.index`', function (assert) {
  visit('/');
  click('a:contains("posts")');
  click('a:contains("First")');
  click('a:contains("edit")');
  click('button#goBackToParentBtn');
  andThen(function () {
    assert.equal(currentRouteName(), 'post.index');
  });
});

test('when transitioning from `post.edit` back to `post.index`' +
  ' back to `posts` and back to `index`', function (assert) {
    visit('/');
    click('a:contains("posts")');
    click('a:contains("First")');
    click('a:contains("edit")');
    click('button#goBackToParentBtn');
    click('button#goBackToParentBtn');
    click('button#goBackToParentBtn');

    andThen(function () {
      assert.equal(currentRouteName(), 'index');
    });
  });

test('when visiting the info and about route ' +
  'and then navigating back to the info route', function (assert) {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    click('button#goBackToParentBtn');
    andThen(function () {
      assert.equal(currentRouteName(), 'index');
    });
  });

