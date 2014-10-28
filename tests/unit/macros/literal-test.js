import Ember from 'ember';
import l from 'ember-cpm/macros/literal';

var MyType = Ember.Object.extend({
  literalProp: l('val')
});

var myObj;

module('literal', {
  setup: function () {
    myObj = MyType.create({
      val: '6'
    });
  }
});

test('Property key (should return the key its self)', function () {
  strictEqual(myObj.get('literalProp'), 'val');
});

test('No argument case', function () {
  throws(function () {
    var TestType = Ember.Object.extend({
      val: l()
    });
  }, "Illegal Argument");
});

test('Null argument case', function () {
  throws(function () {
    var TestType = Ember.Object.extend({
      val: l(null)
    });
  }, "Illegal Argument");
});

test('Numeric argument case', function () {
  throws(function () {
    var TestType = Ember.Object.extend({
      val: l(6)
    });
  }, "Illegal Argument");
});

test('Nested computed property argument case', function () {
  throws(function () {
    var TestType = Ember.Object.extend({
      val: l(Ember.computed.alias('abc'))
    });
  }, "Illegal Argument");
});
