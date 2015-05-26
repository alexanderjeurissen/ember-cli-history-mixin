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
        expect(currentPath()).to.equal('index');
      });
    });

    it('visit the posts-route', function () {
      visit('/posts');

      andThen(function () {
        expect(currentPath()).to.equal('posts');
      });
    });

    it('visit the post-route', function () {
      visit('/post/1');

      andThen(function () {
        expect(currentPath()).to.equal('post');
      });
    });

    it('goBack to index from posts-route', function () {
      visit('/posts');

      click('button#goBackBtn');

      andThen(function () {
        expect(currentPath()).to.equal('index');
      });
    });

    it('goBack to index from post-route', function () {
      visit('/post/1');
      click('button#goBackBtn');
      wait();
      andThen(function () {
        expect(currentPath()).to.equal('index');
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

    it('index => posts', function () {
      andThen(function () {
        expect(currentPath()).to.equal('posts');
      });
    });

    it('back from posts <- index', function () {
      click('button:contains("Back")');
      andThen(function () {
        expect(currentPath()).to.equal('index');
      });
    });

    it('from index -> posts', function () {
      click('button#goBackBtn');
      click('button#goForwardBtn');
      andThen(function () {
        expect(currentPath()).to.equal('posts');
      });
    });

    it('from index <-> posts', function () {
      click('button:contains("Back")');
      click('button:contains("Forward")');
      click('button:contains("Back")');
      andThen(function () {
        expect(currentPath()).to.equal('index');
      });
    });

    it('from index <- posts <- post', function () {
      click('a:contains("First")');
      click('button#goBackBtn');
      click('button#goBackBtn');
      click('button#goBackBtn');
      andThen(function () {
        expect(currentPath()).to.equal('index');
      });
    });

    it('from index -> posts -> post', function () {
      click('a:contains("First")');
      click('button#goBackBtn');
      click('button#goBackBtn');
      click('button#goBackBtn');

      click('button#goForwardBtn');
      click('button#goForwardBtn');
      click('button#goForwardBtn');
      andThen(function () {
        expect(currentPath()).to.equal('post');
        expect(find('#postContent').text()).to.contain('First Content');
      });
    });
  });
});

/* transition.params null issue (More context objects were passed than there are dynamic segments for the route) */

describe('it can navigate between a few routes that have null params', function () {
  it('visits the info route ', function () {
    visit('/');
    click('a:contains("Info")');
    andThen(function () {
      expect(currentPath()).to.equal('info');
    });
  });
  it('visits the info and then the about route', function () {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    andThen(function () {
      expect(currentPath()).to.equal('about');
    });
  });
  it('visits the info and about route and then goes back to the info route', function () {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    click('button#goBackBtn');
    andThen(function () {
      expect(currentPath()).to.equal('info');
    });
  });
  it('visits the info and about route and then goes back to the info route', function () {
    visit('/');
    click('a:contains("Info")');
    click('a:contains("About")');
    click('button#goBackBtn');
    click('button#goBackBtn');
    andThen(function () {
      expect(currentPath()).to.equal('index');
    });
  });
});

