(function(window, Ember, $, EmberCPM) {

  function getGroupForInsertion(groups, item, propertyKey, changeMeta, instanceMeta) {
    var value = item.get(propertyKey);
    var group = groups.findBy('value', value);

    if (!group) {
      group = Ember.Object.create({
        property: propertyKey,
        value: value,
        items: Ember.A()
      });

      instanceMeta.groupGuidToDependentIndexes[Ember.guidFor(group)] = [];
      groups.pushObject(group);
    }

    return group;
  }

  function getGroupForRemoval(groups, item, propertyKey, changeMeta, instanceMeta) {
    var value;

    if (changeMeta.previousValues) {
      value = changeMeta.previousValues[propertyKey];
    } else {
      value = item.get(propertyKey);
    }

    return groups.findBy('value', value);
  }

  function getGroupInsertionIndex(group, dependentItemIndex, instanceMeta) {
    var dependentIndexes = instanceMeta.groupGuidToDependentIndexes[Ember.guidFor(group)];

    for (var i = dependentIndexes.get('length') - 1; i >= 0; i--) {
      if (dependentIndexes[i] < dependentItemIndex) {
        return i + 1;
      }
    }

    return 0;
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
          instanceMeta.groupGuidToDependentIndexes = {};
          return groups;
        },

      initialValue: function() {
        return Ember.A();
      },

      addedItem: function(groups, item, changeMeta, instanceMeta) {
        var group = getGroupForInsertion(groups, item, propertyKey, changeMeta, instanceMeta),
            items = group.get('items'),
            dependentIndexes = instanceMeta.groupGuidToDependentIndexes[Ember.guidFor(group)],
            index = getGroupInsertionIndex(group, changeMeta.index, instanceMeta);

        dependentIndexes.insertAt(index, changeMeta.index);
        items.insertAt(index, item);

        return groups;
      },

      removedItem: function(groups, item, changeMeta, instanceMeta) {
        var group = getGroupForRemoval(groups, item, propertyKey, changeMeta, instanceMeta),
            items = group.get('items'),
            dependentIndexes = instanceMeta.groupGuidToDependentIndexes[Ember.guidFor(group)],
            index = dependentIndexes.lastIndexOf(changeMeta.index);

        dependentIndexes.removeAt(index);
        items.removeAt(index);

        if (Ember.isEmpty(items)) {
          delete instanceMeta.groupGuidToDependentIndexes[Ember.guidFor(group)];
          groups.removeObject(group);
        }

        return groups;
      }

    });
  };

}).call(undefined, this, this.Ember, this.jQuery, this.EmberCPM);