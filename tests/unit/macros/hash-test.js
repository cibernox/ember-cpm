import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import hash from 'ember-cpm/macros/hash';

module('hash');

var Pokemon = EmberObject.extend({
  stats: hash('name', 'type', 'atk')
});

test('returns a hash of the given keys', function(assert) {
  var pikachu = Pokemon.create({
    name: 'pikachu',
    type: 'electric', 
    atk: 15
  });

  assert.deepEqual(pikachu.get('stats'), {
    name: 'pikachu',
    type: 'electric', 
    atk: 15
  });
});
