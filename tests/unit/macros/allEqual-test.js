import { module, test } from "qunit";
import Ember from 'ember';
import allEqual from 'ember-cpm/macros/all-equal';
import sum from 'ember-cpm/macros/sum';

var MyType = Ember.Object.extend({
  d: allEqual('a', 'c'),
  e: allEqual('a', 'b'),
  f: allEqual(),
  g: allEqual('a'),
  h: allEqual('a', 'c', 6),
  i: allEqual(Ember.computed.or('a'), 6),
  j: allEqual(sum('a','b'), 8)
});

var myObj = MyType.create({
  a: 6,
  b: 2,
  c: 6
});

module('allEqual');

test('compare properties for equaltesty', function (assert) {
  assert.equal(myObj.get('d'), true);
  assert.equal(myObj.get('e'), false);
  myObj.set('c', '6');
  assert.equal(myObj.get('d'), false);
  myObj.set('a', '6');
  assert.equal(myObj.get('d'), true);
  myObj.setProperties({
    a: 6,
    c: 6
  });
});

test('compare properties and numeric ltesteral for equaltesty', function (assert) {
  assert.equal(myObj.get('h'), true);
  myObj.set('a', 8);
  assert.equal(myObj.get('h'), false);
  myObj.set('a', '6');
  assert.equal(myObj.get('h'), false);
  myObj.set('a', 6);
});

test('handles the zero-argument case', function (assert) {
  assert.equal(myObj.get('f'), true);
});

test('handles the single-argument case', function (assert) {
  assert.equal(myObj.get('g'), true);
});

test('handles composable CPMs', function (assert) {
  assert.equal(myObj.get('i'), true);
  myObj.set('a', 12);
  assert.equal(myObj.get('i'), false);
  myObj.set('a', 6);
  assert.equal(myObj.get('j'), true);
  myObj.set('b', 4);
  assert.equal(myObj.get('j'), false);
});
