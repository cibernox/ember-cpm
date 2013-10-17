(function(window, Ember, $, EmberCPM) {
  var Group = Ember.Object.extend({
    property: null,
    value: null,
    items: null
  });

  function findItemInsertionIndex(items, changeMeta, instanceMeta) {
    for (var i = items.get('length') - 1; i >= 0; i--) {
      var currentItem = items.objectAt(i),
          currentIndex = instanceMeta.itemGuidToIndex[Ember.guidFor(currentItem)];

      if (currentIndex < changeMeta.index) {
        return i + 1;
      }
    }

    return 0;
  }

  function getGroup(groups, item, propertyKey) {
    var value = item.get(propertyKey);
    var group = groups.findBy('value', value);

    if (!group) {
      group = Group.create({
        property: propertyKey,
        value: value,
        items: Ember.A()
      });

      groups.pushObject(group);
    }

    return group;
  }

  function removeItem(groups, group, item) {
    var items = group.get('items');

    items.removeObject(item);

    if (Ember.isEmpty(items)) {
      groups.removeObject(group);
    }
  }

  /**
    Groups an array of objects by a property.

    Returns an array of objects representing each group. The objects are of the
    form:

    ```javascript
    {
      value: "someValue",
      items: [ item1, ..., itemN ]
    }
    ```

    where `value` is the particular value of the property being grouped on
    and `items` is the subset of items from the dependent array with
    `propertyKey` set to `value`.

    `groupBy` respects the order of the dependent array as well as duplicate
    items.
  */
  EmberCPM.Macros.groupBy = function(dependentKey, propertyKey) {
    return Ember.reduceComputed(dependentKey + ".@each." + propertyKey, {

      initialize: function (groups, changeMeta, instanceMeta) {
          instanceMeta.itemGuidToIndex = Ember.Object.create();
          return groups;
        },

      initialValue: function() {
        return Ember.A();
      },

      addedItem: function(groups, item, changeMeta, instanceMeta) {
        instanceMeta.itemGuidToIndex[Ember.guidFor(item)] = changeMeta.index;

        var items = getGroup(groups, item, propertyKey).get('items');
        var insertionIndex = findItemInsertionIndex(items, changeMeta, instanceMeta);
        items.insertAt(insertionIndex, item);

        return groups;
      },

      removedItem: function(groups, item, changeMeta, instanceMeta) {
        var value;

        if (changeMeta.previousValues) {
          value = changeMeta.previousValues[propertyKey];
        } else {
          delete instanceMeta.itemGuidToIndex[Ember.guidFor(item)];
          value = item.get(propertyKey);
        }

        var group = groups.findBy('value', value);
        removeItem(groups, group, item);

        return groups;
      }

    });
  };

}).call(undefined, this, this.Ember, this.jQuery, this.EmberCPM);
