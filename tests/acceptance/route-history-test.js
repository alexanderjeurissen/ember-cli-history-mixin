/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';

import { expect } from 'chai';
import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

beforeEach(function () {
  App = startApp();
  visit('/');
});

afterEach(function () {
  Ember.run(App, 'destroy');
});

describe('when directly navigating to a route, ', function () {
  describe('it should be able to ', function () {
    it('visit the index-route', function () {
      visit('/');

      andThen(function () {
        expect(currentRouteName()).to.equal('index');
      });
    });

    it('visit the posts-route', function () {
      visit('/posts');

      andThen(function () {
        expect(currentRouteName()).to.equal('posts');
      });
    });

    it('visit the post-route', function () {
      visit('/posts/1');

      andThen(function () {
        expect(currentRouteName()).to.equal('post.index');
      });
    });

    it('goBack to index from posts-route', function () {
      visit('/posts');

      click('button#goBackBtn');

      andThen(function () {
        expect(currentRouteName()).to.equal('index');
      });
    });

    it('goBack to index from post-route', function () {
      visit('/posts/1');
      click('button#goBackBtn');
      wait();
      andThen(function () {
        expect(currentRouteName()).to.equal('index');
      });
    });
  });
});

describe('When transitioning between routes, ', function () {
  describe('it should be able to transition ', function () {
    beforeEach(function () {
      visit('/');
      click('a:contains("posts")');
    });

    it('from `index` to `posts`', function () {
      andThen(function () {
        expect(currentRouteName()).to.equal('posts');
      });
    });

    it('back from `posts` to `index`', function () {
      click('button:contains("Back")');
      andThen(function () {
        expect(currentRouteName()).to.equal('index');
      });
    });

    it('from `index` forward to `posts`', function () {
      click('button#goBackBtn');
      click('button#goForwardBtn');
      andThen(function () {
        expect(currentRouteName()).to.equal('posts');
      });
    });

    it('from `posts` back to `index`' +
       'forward to `posts` and back to `index`', function () {
      click('button:contains("Back")');
      click('button:contains("Forward")');
      click('button:contains("Back")');
      andThen(function () {
        expect(currentRouteName()).to.equal('index');
      });
    });

    it('from `post` back to `posts` back to `index`', function () {
      click('a:contains("First")');
      click('button#goBackBtn');
      click('button#goBackBtn');
      click('button#goBackBtn');
      andThen(function () {
        expect(currentRouteName()).to.equal('index');
      });
    });

    it('from `index` forward to `posts` and forward to `post`', function () {
      click('a:contains("First")');
      click('button#goBackBtn');
      click('button#goBackBtn');
      click('button#goBackBtn');

      click('button#goForwardBtn');
      click('button#goForwardBtn');
      click('button#goForwardBtn');
      andThen(function () {
        expect(currentRouteName()).to.equal('post.index');
        expect(find('#postContent').text()).to.contain('First Content');
      });
    });
  });
});

describe('it can navigate between routes that have null params', function () {
  it('visits the info route ', function () {
    visit('/');
    click('a:contains("Info")');
    andThen(function () {
      expect(currentRouteName()).to.equal('info');
    });
  });

  it('visits the info and then the about route', function () {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    andThen(function () {
      expect(currentRouteName()).to.equal('about');
    });
  });

  it('visits the info and about route '+
     'and then goes back to the info route', function () {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    click('button#goBackBtn');
    andThen(function () {
      expect(currentRouteName()).to.equal('info');
    });
  });

  it('visits the info and about route '+
     'and then goes back to the info route', function () {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    click('button#goBackBtn');
    click('button#goBackBtn');
    andThen(function () {
      expect(currentRouteName()).to.equal('index');
    });
  });
});

