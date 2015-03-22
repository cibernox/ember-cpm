import { module, test } from "qunit";
import Ember from "ember";
import sumBy from "ember-cpm/macros/sum-by";

var objects, base;

module("sumBy", {
  setup: function(assert){
    objects = Ember.A([]);
    objects.push({blammo: 10},
                 {blammo: 10});

    base = Ember.Object.extend({
      objects: objects,
      sum: sumBy('objects', 'blammo')
    }).create();
  }
});

test("can accept two parameters (dependentKey, and propertyKey)", function(assert){
  base = Ember.Object.extend({
    objects: objects,
    sum: sumBy('objects', 'blammo')
  }).create();

  assert.equal(base.get('sum'), 20);

  objects.popObject();

  assert.equal(base.get('sum'), 10);
});

test("adds items together", function(assert){
  assert.equal(base.get('sum'), 20);
});

test("adds float values", function(assert){
  objects.pushObject({blammo: 5.73});

  assert.equal(base.get('sum'), 25.73);
});

test("removes float values", function(assert){
  var floatObj = {blammo: 5.73};

  objects.pushObject(floatObj);
  assert.equal(base.get('sum'), 25.73);

  objects.removeObject(floatObj);
  assert.equal(base.get('sum'), 20);
});

test("recalculates upon adding an item", function(assert){
  assert.equal(base.get('sum'), 20);

  objects.pushObject({blammo: 15});

  assert.equal(base.get('sum'), 35);
});

test("should recalculate upon removing", function(assert){
  assert.equal(base.get('sum'), 20);

  objects.popObject();

  assert.equal(base.get('sum'), 10);
});

test("recalculates upon changing an item", function(assert){
  assert.equal(base.get('sum'), 20);

  var last = objects.get('lastObject');
  Ember.set(last, 'blammo', 5);

  assert.equal(base.get('sum'), 15);
});

test("can be used on an ArrayProxy itself", function(assert){
  base = Ember.ArrayProxy.extend({
    content: objects,
    sum: sumBy('@this', 'blammo')
  }).create();

  assert.equal(base.get('sum'), 20);

  var last = objects.get('lastObject');
  Ember.set(last, 'blammo', 5);

  assert.equal(base.get('sum'), 15);

  objects.pushObject({blammo: 15});

  assert.equal(base.get('sum'), 30);

  objects.popObject();

  assert.equal(base.get('sum'), 15);
});
