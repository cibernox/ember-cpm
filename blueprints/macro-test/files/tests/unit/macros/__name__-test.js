import Ember from 'ember';
import <%= camelizedModuleName %> from 'ember-cpm/macros/<%= dasherizedModuleName %>';

var MyType = Ember.Object.extend({
  val: '6',
  <%= camelizedModuleName %>Prop: <%= camelizedModuleName %>('val')
});

var myObj;

module('<%= camelizedModuleName %>', {
  beforeEach() {
    myObj = MyType.create();
  }
});

test('My first test', function () {
  strictEqual(myObj.get('<%= camelizedModuleName %>Prop'), "hello world");
});
