# Ember-cli-history-mixin [![Build Status](https://travis-ci.org/alexanderjeurissen/ember-cli-history-mixin.svg)](https://travis-ci.org/alexanderjeurissen/ember-cli-history-mixin)

Ember-cli-history-mixin is a mixin that provides `goForward` `gobackward` and
`goToParent` actions to an Ember-CLI application which in turn either navigate
one page back or one page forward or in the case of the `goToParent` action
navigate to the parent route where the hierarchy of the router is used as
guideline.

Seeing as there is no native ember functionality for keeping track of `history`
most people fall back to using the global `window.history` object.

Using the window.History object for tracking route transitions in an ember app
doesn't come without issues. For example it also includes things
like `loading states`, or `edit/new` routes both which are undesirable in most
applications.

I couldn't find a good ember addon / mixin that would provide a simple `goBack`
and `goForward` action and therefore decided to write my own.


## Installation

`ember install:addon ember-cli-history-mixin`

## Which mixin is right for me? `routeHistory` or `parentRoute`?
The *routeHistory mixin* hooks into the `willTransition` and `didTransition`
methods of the application route in order to listen to route changes. The
*parentRoute mixin* calculates the nearest parent route based on the current
route and uses the hierarchy of the router object.

When you need a mixin that keeps track of the history of your application and
you need both `goForward` and `goBack` actions then I would suggest you use the
*routeHistory mixin* however when you don't need to actively monitor the history
of your application and you rather want `cancel` buttons that navigate to the
nearest parent route then the *parentRoute mixin* will better suit your needs
and is also less resource intensive.

The mixins don't conflict with each other so they can be used at the same time.

## Using the `RouteHistory` mixin
This ember-cli addon provides a `routeHistory mixin` that actively monitors the
route changes in your application because of that it needs to be injected in the
application-route in order to keep track of all route changes.

```javascript
import Ember from 'ember';
import RouteHistoryMixin from 'ember-cli-history-mixin/mixins/route-history';

export default Ember.Route.extend(RouteHistoryMixin, {
  //your application-route content
});
```

This allows other parts of the application to send the `goBack` or `goForward`
actions which will be captured in the mixin.

###templates:

```handlebars
<button id="goBackBtn" {{action "goBack"}}>Back</button>
<button id="goForwardBtn" {{action "goForward"}}>Forward</button>
```

###components:

```javascript
App.BackButtonComponent = Ember.Component.extend({
  click: function() {
    this.sendAction('goBack');
  }
});
```

## Using the `ParentRoute` mixin
In addition to the `routeHistory mixin` This ember-cli addon provides a
`parentRoute mixin` that is less resource intensive and computes the nearest
parent route based on the hierarchy of the router object.

Because it doesn't actively monitor the route history, one may choose to only
inject the mixin in routes that need the `goToParent` action, however if you
want to use the action application-wide then it's advised to inject the mixin in
the application route.

```javascript
import Ember from 'ember';
import ParentRouteMixin from 'ember-cli-history-mixin/mixins/parent-route';

export default Ember.Route.extend(ParentRouteMixin, {
  //your application-route content
});
```

This allows other parts of the application to send the `goToParent` action
which will be captured in the mixin.

###templates:

```handlebars
<button id="goBackBtn" {{action "goBack"}}>Back</button>
<button id="goForwardBtn" {{action "goForward"}}>Forward</button>
```

###components:

```javascript
App.BackButtonComponent = Ember.Component.extend({
  click: function() {
    this.sendAction('goBack');
  }
});
```

## Contribution guidelines:

### Pulling the project in order to modify or Contribute

* `git clone` this repository
* `npm install`
* `bower install`

### Running the demo app

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
