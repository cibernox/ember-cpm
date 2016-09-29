import { module, test } from "qunit";
import Ember from 'ember';
import l from 'ember-cpm/macros/literal';

var MyType = Ember.Object.extend({
  literalProp: l('val')
});

var myObj;

module('literal', {
  beforeEach() {
    myObj = MyType.create({
      val: '6'
    });
  }
});

test('Property key (should return the key its self)', function (assert) {
  assert.strictEqual(myObj.get('literalProp'), 'val');
});
