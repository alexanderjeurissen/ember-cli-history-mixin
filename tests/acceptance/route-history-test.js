/* jshint expr:true */
import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('RouteHistory integration specs', {
  beforeEach: function () {
    App = startApp();
    visit('/');
  },

  afterEach: function () {
    Ember.run(App, 'destroy');
  }
});

test('visit the index-route', function (assert) {
  visit('/');

  andThen(function () {
    assert.equal(currentRouteName(), 'index');
  });
});

test('visit the posts-route', function (assert) {
  visit('/posts');

  andThen(function () {
    assert.equal(currentRouteName(), 'posts');
  });
});

test('visit the post-route', function (assert) {
  visit('/posts/1');

  andThen(function () {
    assert.equal(currentRouteName(), 'post.index');
  });
});

test('goBack to index from posts-route', function (assert) {
  visit('/posts');
  click('button#goBackBtn');

  andThen(function () {
    assert.equal(currentRouteName(), 'index');
  });
});

test('goBack to index from post-route', function (assert) {
  visit('/posts/1');
  click('button#goBackBtn');

  andThen(function () {
    assert.equal(currentRouteName(), 'index');
  });
});


test('when transitioning from `index` to `posts`', function (assert) {
  visit('/');
  click('a:contains("posts")');
  andThen(function () {
    assert.equal(currentRouteName(), 'posts');
  });
});

test('when transitioning back from `posts` to `index`', function (assert) {
  visit('/');
  click('a:contains("posts")');
  click('button:contains("Back")');
  andThen(function () {
    assert.equal(currentRouteName(), 'index');
  });
});

test('when transitioning from `index` forward to `posts`', function (assert) {
  visit('/');
  click('a:contains("posts")');
  click('button#goBackBtn');
  click('button#goForwardBtn');
  andThen(function () {
    assert.equal(currentRouteName(), 'posts');
  });
});

test('when transitioning from `posts` back to `index`' +
  'forward to `posts` and back to `index`', function (assert) {
    visit('/');
    click('a:contains("posts")');
    click('button:contains("Back")');
    click('button:contains("Forward")');
    click('button:contains("Back")');
    andThen(function () {
      assert.equal(currentRouteName(), 'index');
    });
  });

test('when transitioning from `post` back to `posts`' +
  ' and back to `index`', function (assert) {
    visit('/');
    click('a:contains("posts")');
    click('a:contains("First")');
    click('button#goBackBtn');
    click('button#goBackBtn');
    click('button#goBackBtn');
    andThen(function () {
      assert.equal(currentRouteName(), 'index');
    });
  });

test('when transitioning from `index` forward to `posts`' +
  ' and forward to `post`', function (assert) {
    visit('/');
    click('a:contains("posts")');
    click('a:contains("First")');
    click('button#goBackBtn');
    click('button#goBackBtn');
    click('button#goBackBtn');

    click('button#goForwardBtn');
    click('button#goForwardBtn');
    click('button#goForwardBtn');
    andThen(function () {
      assert.equal(currentRouteName(), 'post.index');
      assert.ok(find('#postContent').text().indexOf('First Content') > -1);
    });
  });

test('when visiting the info route ', function (assert) {
  visit('/');
  click('a:contains("Info")');
  andThen(function () {
    assert.equal(currentRouteName(), 'info');
  });
});

test('when visiting the info and then the about route', function (assert) {
  visit('/');
  click('a:contains("Info")');
  click('a:contains("About")');
  andThen(function () {
    assert.equal(currentRouteName(), 'about');
  });
});

test('when visiting the info and about route ' +
  'and then navigating back to the info route', function (assert) {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    click('button#goBackBtn');
    andThen(function () {
      assert.equal(currentRouteName(), 'info');
    });
  });

test('when visiting the info and about route ' +
  'and then navigating back to the info route', function (assert) {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    click('button#goBackBtn');
    click('button#goBackBtn');
    andThen(function () {
      assert.equal(currentRouteName(), 'index');
    });
  });

