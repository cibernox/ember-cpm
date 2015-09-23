import { module, test } from "qunit";
import Ember from "ember";
import conditional from "ember-cpm/macros/conditional";

var gt = Ember.computed.gt;
var gte = Ember.computed.gte;
var lt = Ember.computed.lt;
var lte = Ember.computed.lte;
var and = Ember.computed.and;
var eq = Ember.computed.equal;
var empty = Ember.computed.empty;

module('conditional');

test('handles a boolean conditional properly', function(assert) {
  var MyType = Ember.Object.extend({
    a: true,
    b: conditional('a', 'yes', 'no')
  });

  var myObj = MyType.create();

  assert.equal(myObj.get('b'), 'yes');
  myObj.set('a', false);
  assert.equal(myObj.get('b'), 'no');
});

function simpleComputedPropertyMacroTest(name, fn, tests) {
  test(Ember.String.fmt('handles composed "%@" computed proerty', name), function (assert) {
    var MyType = Ember.Object.extend({
      a: -1,
      mac: conditional(fn('a', 15), 'yes', 'no')
    });

    var myObj = MyType.create();

    for (var i = 0; i < tests.length; i += 1) {
      myObj.set('a', tests[i].value);
      assert.equal(myObj.get('mac'), tests[i].testResult);
    }
  });
}

simpleComputedPropertyMacroTest('equal', eq, [
  {value: 12, testResult: 'no'},
  {value: 15, testResult: 'yes'},
  {value: 13, testResult: 'no'}
]);
simpleComputedPropertyMacroTest('lt', lt, [
  {value: 12, testResult: 'yes'},
  {value: 16, testResult: 'no'},
  {value: 15, testResult: 'no'},
  {value: 13, testResult: 'yes'}
]);
simpleComputedPropertyMacroTest('lte', lte, [
  {value: 12, testResult: 'yes'},
  {value: 16, testResult: 'no'},
  {value: 15, testResult: 'yes'},
  {value: 13, testResult: 'yes'}
]);
simpleComputedPropertyMacroTest('gt', gt, [
  {value: 12, testResult: 'no'},
  {value: 16, testResult: 'yes'},
  {value: 15, testResult: 'no'},
  {value: 13, testResult: 'no'}
]);
simpleComputedPropertyMacroTest('gte', gte, [
  {value: 12, testResult: 'no'},
  {value: 16, testResult: 'yes'},
  {value: 15, testResult: 'yes'},
  {value: 13, testResult: 'no'}
]);

test('handles "and" composable computed property macro', function (assert) {
  var MyType = Ember.Object.extend({
    hasTent: true,
    hasBackpack: false,
    readyForCampString: conditional(and('hasTent', 'hasBackpack'), 'ready', 'not ready')
  });

  var myObj = MyType.create();
  assert.equal(myObj.get('readyForCampString'), 'not ready');
  myObj.set('hasBackpack', true);
  assert.equal(myObj.get('readyForCampString'), 'ready');
  myObj.set('hasTent', false);
  assert.equal(myObj.get('readyForCampString'), 'not ready');
});

test('handles "empty" composable computed property macro', function (assert) {
  var MyType = Ember.Object.extend({
    attendees: Ember.A(['Charlie', 'Dennis', 'Mac']),
    paddysPubStatus: conditional(empty('attendees'), 'closed', 'open')
  });

  var myObj = MyType.create();
  assert.equal(myObj.get('paddysPubStatus'), 'open');
  myObj.get('attendees').clear();
  assert.equal(myObj.get('paddysPubStatus'), 'closed');
  myObj.get('attendees').addObject('frank');
  assert.equal(myObj.get('paddysPubStatus'), 'open');
});

test('handles nested conditional computed properties', function (assert) {
  var MyType = Ember.Object.extend({
    a: 14,
    b: conditional(conditional(eq('a', 15), 'yes', null), 'good', 'bad')
  });

  var myObj = MyType.create();
  assert.equal(myObj.get('b'), 'bad');
  myObj.set('a', 15);
  assert.equal(myObj.get('b'), 'good');
  myObj.set('a', 16);
  assert.equal(myObj.get('b'), 'bad');
});

test('handles computed positive and negative values', function(assert) {
  var MyType = Ember.Object.extend({
    a: true,
    positive: 'Yep',
    negative: 'Nope',
    b: conditional('a', 'positive', 'negative')
  });

  var myObj = MyType.create();

  assert.equal(myObj.get('b'), 'Yep');
  myObj.set('positive', 'Yes!');
  assert.equal(myObj.get('b'), 'Yes!');

  myObj.set('a', false);
  assert.equal(myObj.get('b'), 'Nope');

  myObj.set('negative', 'No!');
  assert.equal(myObj.get('b'), 'No!');
});
