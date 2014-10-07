import Ember from "ember";
import conditional from "ember-cpm/macros/conditional";

var gt = Ember.computed.gt;
var gte = Ember.computed.gte;
var lt = Ember.computed.lt;
var lte = Ember.computed.lte;
var and = Ember.computed.and;
var any = Ember.computed.any;
var eq = Ember.computed.equal;
var empty = Ember.computed.empty;


module('conditional');

test('handles a boolean conditional properly', function() {
  var MyType = Ember.Object.extend({
    a: true,
    b: conditional('a', 'yes', 'no')
  });

  var myObj = MyType.create();

  equal(myObj.get('b'), 'yes');
  myObj.set('a', false);
  equal(myObj.get('b'), 'no');
});

function simpleComputedPropertyMacroTest(name, fn, tests) {
  test('handles composed "%@" computed proerty'.fmt(name), function () {
    var MyType = Ember.Object.extend({
      a: -1,
      mac: conditional(fn('a', 15), 'yes', 'no')
    });

    var myObj = MyType.create();

    for (var i = 0; i < tests.length; i += 1) {
      myObj.set('a', tests[i].value);
      equal(myObj.get('mac'), tests[i].testResult);
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

test('handles "and" composable computed property macro', function () {
  var MyType = Ember.Object.extend({
    hasTent: true,
    hasBackpack: false,
    readyForCampString: conditional(and('hasTent', 'hasBackpack'), 'ready', 'not ready')
  });

  var myObj = MyType.create();
  equal(myObj.get('readyForCampString'), 'not ready');
  myObj.set('hasBackpack', true);
  equal(myObj.get('readyForCampString'), 'ready');
  myObj.set('hasTent', false);
  equal(myObj.get('readyForCampString'), 'not ready');
});

test('handles "any" composable computed property macro', function () {
  var MyType = Ember.Object.extend({
    hasTent: false,
    hasBackpack: false,
    readyForCampString: conditional(any('hasTent', 'hasBackpack'), 'started getting ready', 'did not start yet')
  });

  var myObj = MyType.create();
  equal(myObj.get('readyForCampString'), 'did not start yet');
  myObj.set('hasBackpack', true);
  equal(myObj.get('readyForCampString'), 'started getting ready');
  myObj.set('hasBackpack', false);
  equal(myObj.get('readyForCampString'), 'did not start yet');
  myObj.setProperties({hasBackpack: true, hasTesnt: true});
  equal(myObj.get('readyForCampString'), 'started getting ready');
});

test('handles "empty" composable computed property macro', function () {
  var MyType = Ember.Object.extend({
    attendees: ['Charlie', 'Dennis', 'Mac'],
    paddysPubStatus: conditional(empty('attendees'), 'closed', 'open')
  });

  var myObj = MyType.create();
  equal(myObj.get('paddysPubStatus'), 'open');
  myObj.get('attendees').clear();
  equal(myObj.get('paddysPubStatus'), 'closed');
  myObj.get('attendees').addObject('frank');
  equal(myObj.get('paddysPubStatus'), 'open');
});

test('handles nested conditional computed properties', function () {
  var MyType = Ember.Object.extend({
    a: 14,
    b: conditional(conditional(eq('a', 15), 'yes', null), 'good', 'bad')
  });

  var myObj = MyType.create();
  equal(myObj.get('b'), 'bad');
  myObj.set('a', 15);
  equal(myObj.get('b'), 'good');
  myObj.set('a', 16);
  equal(myObj.get('b'), 'bad');
});
