import Orbit from 'orbit';
import attr from 'ember_orbit/attr';
import hasOne from 'ember_orbit/relationships/has_one';
import hasMany from 'ember_orbit/relationships/has_many';
import Model from 'ember_orbit/model';

var get = Ember.get;

var Planet,
    Moon,
    Star;

module("Unit - Model", {
  setup: function() {
    Planet = Model.extend({
      name: attr('string'),
      classification: attr('string'),
      sun: hasOne('star'),
      moons: hasMany('moon')
    });

    Moon = Model.extend({
      name: attr('string'),
      planet: hasOne('planet')
    });

    Star = Model.extend({
      name: attr('string'),
      planets: hasMany('planet')
    });
  },

  teardown: function() {
    Planet = null;
    Moon = null;
    Star = null;
  }
});

test("it exists", function() {
  ok(Planet);
});

test("#attributes returns defined attributes", function() {
  var attributes,
      keys;

  attributes = get(Planet, 'attributes');
  keys = Object.keys(attributes);
  equal(keys.length, 2);
  equal(keys[0], 'name');
  equal(keys[1], 'classification');
});

test("#links returns defined links", function() {
  var links,
      keys;

  links = get(Planet, 'links');
  keys = Object.keys(links);
  equal(keys.length, 2);
  equal(keys[0], 'sun');
  equal(keys[1], 'moons');

  links = get(Moon, 'links');
  keys = Object.keys(links);
  equal(keys.length, 1);
  equal(keys[0], 'planet');

  links = get(Star, 'links');
  keys = Object.keys(links);
  equal(keys.length, 1);
  equal(keys[0], 'planets');
});

test("#create cannot be called directly on models", function() {
  throws(
    function() {
      var earth = Planet.create();
    },
    'You should not call `create` on a model'
  );
});
