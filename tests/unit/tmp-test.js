import { test, moduleFor } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Ember from 'ember';

moduleFor('controller:application', 'Import from inside an app');

test('Macros can be required individually', function(){
  var controller = this.subject();
  equal(controller.get('computedValue'), 'Anonymous', 'Macros are available one by one');
});

test('EmberCPM can be required all at once', function(){
  var controller = this.subject();
  equal(controller.get('total'), 3, 'EmberCPM is available all at once');
});
