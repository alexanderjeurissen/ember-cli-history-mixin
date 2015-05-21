# Ember-cli-history-mixin [![Build Status](https://travis-ci.org/alexanderjeurissen/ember-cli-history-mixin.svg)](https://travis-ci.org/alexanderjeurissen/ember-cli-history-mixin)

Ember-cli-history-mixin is a mixin that provides forward and backward actions
to an Ember-CLI application which in turn either navigate one page back or one
page forward.


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

## Usage
This ember-cli addon provides a route-history mixin that needs to be injected in
the application-route in order to keep track of all route changes.

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
