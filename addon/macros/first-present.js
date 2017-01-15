import { isBlank } from 'ember-utils';
import { resolveKeys } from '../utils';

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

  @method firstPresent
  @for macros
  @param *arguments
  @return The first arguments that is not blank.
*/
export default resolveKeys((...values) => {
  for (let i in values) {
    let value = values[i];
    if (!isBlank(value)) {
      return value;
    }
  }
});
