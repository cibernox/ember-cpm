describe('inRange', function () {
  var sourceAry, base, exclusiveBase;


  describe('when it receives "@this" in the property key', function(){
    var Obj = Ember.Object.extend({
      selection: EmberCPM.Macros.inRange('objects', '@this', 'rangeStart', 'rangeEnd')
    });

    var ExclusiveObj = Ember.Object.extend({
      selection: EmberCPM.Macros.inRange('objects', '@this', 'rangeStart', 'rangeEnd', {exclusive: true})
    });

    beforeEach(function () {
      sourceAry = Ember.A([1,4,7,2,8,7,3,6,9,8,2,5,2]);

      base = Obj.create({objects: sourceAry, rangeStart: 3, rangeEnd: 7});
      exclusiveBase = ExclusiveObj.create({objects: sourceAry, rangeStart: 3, rangeEnd: 7});

      // Trigger the CP at least once
      base.get('selection');
      exclusiveBase.get('selection');
    });

    it('returns the elements within the range defined by the given keys (inclusively by default)', function(){
      expect(base.get('selection').toArray()).to.eql([4,7,7,3,6,5]);
    });

    it('returns the elements exclusively if receives { exclusive: true }', function(){
      exclusiveBase = ExclusiveObj.create({objects: sourceAry, rangeStart: 3, rangeEnd: 7});
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,6,5]);
    });

    it('is updated when new elements are added to the source array preserving the order', function(){
      base.get('objects').insertAt(2,5);
      expect(base.get('selection').toArray()).to.eql([4,5,7,7,3,6,5]);
    });

    it('is updated when new elements are removed from the source array', function(){
      base.get('objects').removeAt(7);
      base.get('objects').removeAt(1);
      expect(base.get('selection').toArray()).to.eql([7,7,3,5]);
    });

    it('is updated when the start bound of the range gets incremented', function(){
      Ember.run(base, 'set', 'rangeStart', 5);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 5);
      expect(base.get('selection').toArray()).to.eql([7,7,6,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([6]);
    });

    it('is updated when the start bound of the range gets decremented', function(){
      Ember.run(base, 'set', 'rangeStart', 2);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 2);
      expect(base.get('selection').toArray()).to.eql([4,7,2,7,3,6,2,5,2]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,3,6,5]);
    });

    it('is updated when the start bound of the range gets moved up and down', function(){
      Ember.run(base, 'set', 'rangeStart', 5);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 5);
      expect(base.get('selection').toArray()).to.eql([7,7,6,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([6]);

      Ember.run(base, 'set', 'rangeStart', 3);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 3);
      expect(base.get('selection').toArray()).to.eql([4,7,7,3,6,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,6,5]);

      Ember.run(base, 'set', 'rangeStart', 2);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 2);
      expect(base.get('selection').toArray()).to.eql([4,7,2,7,3,6,2,5,2]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,3,6,5]);

      Ember.run(base, 'set', 'rangeStart', 1);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 1);
      expect(base.get('selection').toArray()).to.eql([1,4,7,2,7,3,6,2,5,2]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,2,3,6,2,5,2]);
    });

    it('is updated when the end bound of the range gets incremented', function(){
      Ember.run(base, 'set', 'rangeEnd', 8);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 8);
      expect(base.get('selection').toArray()).to.eql([4,7,8,7,3,6,8,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,7,7,6,5]);
    });

    it('is updated when the end bound of the range gets decremented', function(){
      Ember.run(base, 'set', 'rangeEnd', 6);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 6);
      expect(base.get('selection').toArray()).to.eql([4,3,6,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,5]);
    });

    it('is updated when the end bound of the range gets moved up and down', function(){
      Ember.run(base, 'set', 'rangeEnd', 5);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 5);
      expect(base.get('selection').toArray()).to.eql([4,3,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4]);

      Ember.run(base, 'set', 'rangeEnd', 7);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 7);
      expect(base.get('selection').toArray()).to.eql([4,7,7,3,6,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,6,5]);

      Ember.run(base, 'set', 'rangeEnd', 8);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 8);
      expect(base.get('selection').toArray()).to.eql([4,7,8,7,3,6,8,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,7,7,6,5]);

      Ember.run(base, 'set', 'rangeEnd', 9);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 9);
      expect(base.get('selection').toArray()).to.eql([4,7,8,7,3,6,9,8,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,7,8,7,6,8,5]);
    });

    it('is updated when the both range bounds gets moved up and down', function(){
      Ember.run(base, 'setProperties', {rangeStart: 4, rangeEnd: 6});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 4, rangeEnd: 6});
      expect(base.get('selection').toArray()).to.eql([4,6,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([5]);

      Ember.run(base, 'setProperties', {rangeStart: 2, rangeEnd: 5});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 2, rangeEnd: 5});
      expect(base.get('selection').toArray()).to.eql([4,2,3,2,5,2]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,3]);

      Ember.run(base, 'setProperties', {rangeStart: 1, rangeEnd: 8});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 1, rangeEnd: 8});
      expect(base.get('selection').toArray()).to.eql([1,4,7,2,8,7,3,6,8,2,5,2]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,7,2,7,3,6,2,5,2]);

      Ember.run(base, 'setProperties', {rangeStart: 3, rangeEnd: 7});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 3, rangeEnd: 7});
      expect(base.get('selection').toArray()).to.eql([4,7,7,3,6,5]);
      expect(exclusiveBase.get('selection').toArray()).to.eql([4,6,5]);
    });

    it('preserves the order of the source array', function(){
      expect(base.get('selection').toArray()).to.eql([4,7,7,3,6,5]);
    });
  });

  describe('when it receives a property name in the property key', function(){
    var Obj = Ember.Object.extend({
      selection: EmberCPM.Macros.inRange('objects', 'num', 'rangeStart', 'rangeEnd')
    });

    var ExclusiveObj = Ember.Object.extend({
      selection: EmberCPM.Macros.inRange('objects', 'num', 'rangeStart', 'rangeEnd', {exclusive: true})
    });

    beforeEach(function () {
      sourceAry = Ember.A([
        {num: 1, index: 0},
        {num: 4, index: 1},
        {num: 7, index: 2},
        {num: 2, index: 3},
        {num: 8, index: 4},
        {num: 7, index: 5},
        {num: 3, index: 6},
        {num: 6, index: 7},
        {num: 9, index: 8},
        {num: 8, index: 9},
        {num: 2, index: 10},
        {num: 5, index: 11},
        {num: 2, index: 12}
      ]);

      base = Obj.create({objects: sourceAry, rangeStart: 3, rangeEnd: 7});
      exclusiveBase = ExclusiveObj.create({objects: sourceAry, rangeStart: 3, rangeEnd: 7});

      // Trigger the CP at least once
      base.get('selection');
      exclusiveBase.get('selection');
    });

    it('returns the elements with the target property within the range defined by the given keys (inclusively by default)', function(){
      expect(base.get('selection').mapBy('num')).to.eql([4,7,7,3,6,5]);
    });

    it('returns the elements exclusively if receives { exclusive: true }', function(){
      exclusiveBase = ExclusiveObj.create({objects: sourceAry, rangeStart: 3, rangeEnd: 7});
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,6,5]);
    });

    it('is updated when new elements are added to the source array preserving the order', function(){
      base.get('objects').insertAt(2,{num: 5, index: 13});
      expect(base.get('selection').mapBy('num')).to.eql([4,5,7,7,3,6,5]);
    });

    it('is updated when new elements are removed from the source array', function(){
      base.get('objects').removeAt(7);
      base.get('objects').removeAt(1);
      expect(base.get('selection').mapBy('num')).to.eql([7,7,3,5]);
    });

    it('is updated when the start bound of the range gets incremented', function(){
      Ember.run(base, 'set', 'rangeStart', 5);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 5);
      expect(base.get('selection').mapBy('num')).to.eql([7,7,6,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([6]);
    });

    it('is updated when the start bound of the range gets decremented', function(){
      Ember.run(base, 'set', 'rangeStart', 2);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 2);
      expect(base.get('selection').mapBy('num')).to.eql([4,7,2,7,3,6,2,5,2]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,3,6,5]);
    });

    it('is updated when the start bound of the range gets moved up and down', function(){
      Ember.run(base, 'set', 'rangeStart', 5);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 5);
      expect(base.get('selection').mapBy('num')).to.eql([7,7,6,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([6]);

      Ember.run(base, 'set', 'rangeStart', 3);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 3);
      expect(base.get('selection').mapBy('num')).to.eql([4,7,7,3,6,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,6,5]);

      Ember.run(base, 'set', 'rangeStart', 2);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 2);
      expect(base.get('selection').mapBy('num')).to.eql([4,7,2,7,3,6,2,5,2]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,3,6,5]);

      Ember.run(base, 'set', 'rangeStart', 1);
      Ember.run(exclusiveBase, 'set', 'rangeStart', 1);
      expect(base.get('selection').mapBy('num')).to.eql([1,4,7,2,7,3,6,2,5,2]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,2,3,6,2,5,2]);
    });

    it('is updated when the end bound of the range gets incremented', function(){
      Ember.run(base, 'set', 'rangeEnd', 8);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 8);
      expect(base.get('selection').mapBy('num')).to.eql([4,7,8,7,3,6,8,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,7,7,6,5]);
    });

    it('is updated when the end bound of the range gets decremented', function(){
      Ember.run(base, 'set', 'rangeEnd', 6);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 6);
      expect(base.get('selection').mapBy('num')).to.eql([4,3,6,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,5]);
    });

    it('is updated when the end bound of the range gets moved up and down', function(){
      Ember.run(base, 'set', 'rangeEnd', 5);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 5);
      expect(base.get('selection').mapBy('num')).to.eql([4,3,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4]);

      Ember.run(base, 'set', 'rangeEnd', 7);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 7);
      expect(base.get('selection').mapBy('num')).to.eql([4,7,7,3,6,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,6,5]);

      Ember.run(base, 'set', 'rangeEnd', 8);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 8);
      expect(base.get('selection').mapBy('num')).to.eql([4,7,8,7,3,6,8,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,7,7,6,5]);

      Ember.run(base, 'set', 'rangeEnd', 9);
      Ember.run(exclusiveBase, 'set', 'rangeEnd', 9);
      expect(base.get('selection').mapBy('num')).to.eql([4,7,8,7,3,6,9,8,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,7,8,7,6,8,5]);
    });

    it('is updated when the both range bounds gets moved up and down', function(){
      Ember.run(base, 'setProperties', {rangeStart: 4, rangeEnd: 6});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 4, rangeEnd: 6});
      expect(base.get('selection').mapBy('num')).to.eql([4,6,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([5]);

      Ember.run(base, 'setProperties', {rangeStart: 2, rangeEnd: 5});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 2, rangeEnd: 5});
      expect(base.get('selection').mapBy('num')).to.eql([4,2,3,2,5,2]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,3]);

      Ember.run(base, 'setProperties', {rangeStart: 1, rangeEnd: 8});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 1, rangeEnd: 8});
      expect(base.get('selection').mapBy('num')).to.eql([1,4,7,2,8,7,3,6,8,2,5,2]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,7,2,7,3,6,2,5,2]);

      Ember.run(base, 'setProperties', {rangeStart: 3, rangeEnd: 7});
      Ember.run(exclusiveBase, 'setProperties', {rangeStart: 3, rangeEnd: 7});
      expect(base.get('selection').mapBy('num')).to.eql([4,7,7,3,6,5]);
      expect(exclusiveBase.get('selection').mapBy('num')).to.eql([4,6,5]);
    });

    it('preserves the order of the source array', function(){
      expect(base.get('selection').mapBy('num')).to.eql([4,7,7,3,6,5]);
    });

    it('is not fired when a property other than the target one is updated in the objects of its source array');

    it('any other CP based on this will receive the minimum possible amount of changes');
  });
});
