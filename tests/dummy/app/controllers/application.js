import Controller from '@ember/controller';
import ifNull from 'ember-cpm/macros/if-null';
import EmberCPM from 'ember-cpm';

export default Controller.extend({
  a: 1,
  b: 2,
  something: null,
  computedValue: ifNull('something', 'Anonymous'),
  total: EmberCPM.Macros.sum('a', 'b')
});

