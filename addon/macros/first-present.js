import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;
var isBlank = Ember.isBlank;

var a_slice = Array.prototype.slice;

// isBlank was introduced in Ember 1.5, backport if necessary.
if (!isBlank) {
  isBlank = function(obj) {
    return Ember.isEmpty(obj) || (typeof obj === 'string' && obj.match(/\S/) === null);
  };
}

var isPresent = function(value) {
  return !isBlank(value);
};

/**
  Returns the first argument that is not blank (as in Ember.isBlank)

  Example

  ```javascript
  var obj = Ember.Object.extend({
    nickname: '',
    name: 'Jean-Luc',
    email: 'jean@starship-enterprise.space',
    displayName: firstPresent('nickname', 'name', 'email')
  }).create();


  item.get('displayName'); // 'Jean-Luc'
  ```

  @method macros.firstPresent
  @param *arguments
  @return The first arguments that is not blank.
*/
export default function EmberCPM_firstPresent() {
  var properties = a_slice.call(arguments);
  var computedArgs = a_slice.call(properties);

  computedArgs.push(function() {
    var that = this;
    var property = Ember.A(properties).find(function(key) {
      return isPresent(get(that, key));
    });

    if (property) { return get(that, property); }
  });

  return computed.apply(this, computedArgs);
}
