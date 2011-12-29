# Ember Statechart

### Description:

This is a port of the SproutCore Statechart library from the SproutCore 1.x
framework for use in Ember.js applications. It was principally authored
by Michael Cohen (aka. FrozenCanuck).

### Features / Problems:

  * The `stateObserves()` helper does not properly work with global paths. These
    problems are captured in the unit tests
  * There are a few fixes for bugs that are in the SproutCore 1.x version that
    have not been ported over as of yet.

### Synopsis:

TODO: Add documentation to the README.

For the time being, there are plenty of examples in the source code, and example
usage throughout the extensive unit tests.

### Requirements:

In order to use the Statechart package, you'll need two libraries:

  * [Ember.js runtime library](https://github.com/emberjs/ember.js)
  * [Ember.js utils library](https://github.com/ud3323/ember-utils)

These dependencies are automatically installed if you're using BPM. If you want to download
and use the JS file (and assuming you're already using Ember.js), don't forget to grab
the built version of the Utils package.

### Install:

You can use the Statechart package by either downloading the JavaScript files
provided in the [Downloads section](https://github.com/ud3323/ember-statechart/archives/master)
of this repository or using [BPM](http://getbpm.org/). To install it via BPM, simply run

    bpm add ember-statechart

And this will handle adding all of its dependencies as well. You, of course, need to
be using BPM for your application or package for this to work ;)
