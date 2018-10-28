import { max } from '@ember/object/computed';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from "qunit";
import among from "ember-cpm/macros/among";
import fmt from 'ember-cpm/macros/fmt';

module("among", function() {
  var Show = EmberObject.extend({
    hasCartoonDog: among('pet.name', 'Odie', 'Snoopy')
  });

  test("returns false if the value is not among the given values", function(assert) {
    var show = Show.create({ pet: { name: 'Garfield' } });
    assert.equal(show.get('hasCartoonDog'), false);
  });

  test("returns true if the value is among the given values", function(assert) {
    var show = Show.create({ pet: { name: 'Odie' } });
    assert.equal(show.get('hasCartoonDog'), true);
  });

  test("returns true if the value of a property is among the given values", function(assert) {
    var Typ = EmberObject.extend({
      petName: 'Spot',
      hasCartoonDog: among('petName', 'Odie', 'Snoopy')
    });
    var obj = Typ.create({});
    assert.strictEqual(obj.get('hasCartoonDog'), false);
    obj.set('petName', 'Snoopy');
    assert.strictEqual(obj.get('hasCartoonDog'), true);
  });

  test("returns true if the value of a computed property macro is among the given values", function(assert) {
    assert.expect(2);
    var Typ = EmberObject.extend({
      petName: 'Sp',
      petNameEnd: 'ot',
      hasCartoonDog: among(fmt('petName', 'petNameEnd', '%@%@'), 'Odie', 'Snoopy')
    });
    var obj = Typ.create({});
    run(function () {
      assert.strictEqual(obj.get('hasCartoonDog'), false);
      obj.setProperties({
        petName: 'Sno',
        petNameEnd: 'opy'
      });
      assert.strictEqual(obj.get('hasCartoonDog'), true);
    });
  });

  test("returns true if the value is among the given values (composable CPM)", function(assert) {
    assert.expect(2);
    var Typ = EmberObject.extend({
      petName: 'Sp',
      petNameEnd: 'ot',
      hasCartoonDog: among('Odie', fmt('petName', 'petNameEnd', '%@%@'), 'Snoopy')
    });
    var obj = Typ.create({});
    run(function () {
      assert.strictEqual(obj.get('hasCartoonDog'), false);
      obj.setProperties({
        petName: 'Od',
        petNameEnd: 'ie'
      });
      assert.strictEqual(obj.get('hasCartoonDog'), true);
    });
  });


  test("Numeric values, with numeric computed property macros", function(assert) {
    assert.expect(4);
    var Typ = EmberObject.extend({
      arr: A([17, 28, 51]),
      arr_b: A([12, 21, 28]),
      val: 33,
      prop: among(max('arr_b'), max('arr'), 31, 'val')
    });
    var obj = Typ.create({});
    run(function () {
      assert.strictEqual(obj.get('prop'), false);
      obj.set('val', 28);
      assert.strictEqual(obj.get('prop'), true);
      obj.set('val', 33);
      assert.strictEqual(obj.get('prop'), false);
      obj.set('arr', A([17, 28]));
      assert.strictEqual(obj.get('prop'), true);
    });
  });
});
