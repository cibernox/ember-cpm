import Ember from "ember";
import sumBy from "ember-cpm/macros/sum-by";

var objects, base;

module("sumBy", {
  setup: function(){
    objects = Ember.A([]);
    objects.push({blammo: 10},
                 {blammo: 10});

    base = Ember.Object.extend({
      objects: objects,
      sum: sumBy('objects', 'blammo')
    }).create();
  }
});

test("can accept two parameters (dependentKey, and propertyKey)", function(){
  base = Ember.Object.extend({
    objects: objects,
    sum: sumBy('objects', 'blammo')
  }).create();

  equal(base.get('sum'), 20);

  objects.popObject();

  equal(base.get('sum'), 10);
});

test("adds items together", function(){
  equal(base.get('sum'), 20);
});

test("adds float values", function(){
  objects.pushObject({blammo: 5.73});

  equal(base.get('sum'), 25.73);
});

test("removes float values", function(){
  var floatObj = {blammo: 5.73};

  objects.pushObject(floatObj);
  equal(base.get('sum'), 25.73);

  objects.removeObject(floatObj);
  equal(base.get('sum'), 20);
});

test("recalculates upon adding an item", function(){
  equal(base.get('sum'), 20);

  objects.pushObject({blammo: 15});

  equal(base.get('sum'), 35);
});

test("should recalculate upon removing", function(){
  equal(base.get('sum'), 20);

  objects.popObject();

  equal(base.get('sum'), 10);
});

test("recalculates upon changing an item", function(){
  equal(base.get('sum'), 20);

  var last = objects.get('lastObject');
  Ember.set(last, 'blammo', 5);

  equal(base.get('sum'), 15);
});

test("can be used on an ArrayProxy itself", function(){
  base = Ember.ArrayProxy.extend({
    content: objects,
    sum: sumBy('@this', 'blammo')
  }).create();

  equal(base.get('sum'), 20);

  var last = objects.get('lastObject');
  Ember.set(last, 'blammo', 5);

  equal(base.get('sum'), 15);

  objects.pushObject({blammo: 15});

  equal(base.get('sum'), 30);

  objects.popObject();

  equal(base.get('sum'), 15);
});
