import EmberObject from '@ember/object';
import { module, test } from "qunit";
import l from 'ember-cpm/macros/literal';

var MyType = EmberObject.extend({
  literalProp: l('val')
});

var myObj;

module('literal', function(hooks) {
  hooks.beforeEach(function() {
    myObj = MyType.create({
      val: '6'
    });
  });

  test('Property key (should return the key its self)', function (assert) {
    assert.strictEqual(myObj.get('literalProp'), 'val');
  });
});
