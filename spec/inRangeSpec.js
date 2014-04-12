describe.only('inRange', function () {
  var sourceAry, base;

  describe('when it receives "@this" in the property key', function(){
    beforeEach(function () {
      sourceAry = Ember.A([1,4,7,2,8,7,3,6,8]);

      base = Ember.Object.extend({
        objects: sourceAry,
        selection: EmberCPM.Macros.inRange('objects', '@this', 'rangeStart', 'rangeEnd')
      }).create({
        rangeStart: 3,
        rangeEnd: 7
      });
    });

    it('returns the elements inside the range defined by the given keys (inclusively by default)', function(){
      expect(base.get('selection')).to.include(3,4,6,7);
    });

    it('returns the elements exclusively if recives { exclusive: true }', function(){
      expect(base.get('selection')).to.include(4,6);
    });

    it('is updated when new elements are added to the source array', function(){
      base.get('objects').pushObject(5);
      expect(base.get('selection')).to.include(5);
    });

    it('is updated when new elements are deleted to the source array', function(){
      base.get('objects').removeAt(1);
      base.get('objects').removeAt(7);
      expect(base.get('selection')).to.not.include(4);
      expect(base.get('selection')).to.not.include(6);
    });

    it('is updated when the start bound of the range changes', function(){
      base.set('rangeStart', 5);
      expect(base.get('selection')).to.not.include(3,4);
      expect(base.get('selection')).to.include(6,7);
    });

    it('is updated when the end bound of the range changes', function(){
      base.set('rangeEnd', 5);
      expect(base.get('selection')).to.include(3,4);
      expect(base.get('selection')).to.not.include(6,7);
    });

    it('is updated when the both range bounds change', function(){
      base.setProperties({rangeStart: 4, rangeEnd: 6});
      expect(base.get('selection')).to.not.include(3,7);
      expect(base.get('selection')).to.include(4,6);
    });

    it('preserves the order of the source array', function(){
      expect(base.get('selection')).to.deep.equal([4,7,7,3,6]);
    });
  });

  describe('when it receives a property name in the property key', function(){
    beforeEach(function () {
      sourceAry = Ember.A([
        Ember.Object.create({num: 1, index: 0}),
        Ember.Object.create({num: 4, index: 1}),
        Ember.Object.create({num: 7, index: 2}),
        Ember.Object.create({num: 2, index: 3}),
        Ember.Object.create({num: 8, index: 4}),
        Ember.Object.create({num: 7, index: 5}),
        Ember.Object.create({num: 3, index: 6}),
        Ember.Object.create({num: 6, index: 7}),
        Ember.Object.create({num: 8, index: 8})
      ]);

      base = Ember.Object.extend({
        objects: sourceAry,
        selection: EmberCPM.Macros.inRange('objects', 'num', 'rangeStart', 'rangeEnd')
      }).create({
        rangeStart: 3,
        rangeEnd: 7
      });
    });

    it('returns the elements with the target property inside the range defined by the given keys (inclusively by default)', function(){
      expect(base.get('selection').mapBy('num')).to.include(3,4,6,7);
    });

    it('returns the elements exclusively if recives { exclusive: true }', function(){
      expect(base.get('selection').mapBy('num')).to.include(4,6);
    });

    it('is updated when new elements are added to the source array', function(){
      base.get('objects').pushObject(Ember.Object.create({num: 5, index: 9}));
      expect(base.get('selection').mapBy('num')).to.include(5);
    });

    it('is updated when new elements are deleted to the source array', function(){
      base.get('objects').removeAt(1);
      base.get('objects').removeAt(7);
      expect(base.get('selection').mapBy('num')).to.not.include(4);
      expect(base.get('selection').mapBy('num')).to.not.include(6);
    });

    it('is updated when the start bound of the range changes', function(){
      base.set('rangeStart', 5);
      expect(base.get('selection').mapBy('num')).to.not.include(3,4);
      expect(base.get('selection').mapBy('num')).to.include(6,7);
    });

    it('is updated when the end bound of the range changes', function(){
      base.set('rangeEnd', 5);
      expect(base.get('selection').mapBy('num')).to.include(3,4);
      expect(base.get('selection').mapBy('num')).to.not.include(6,7);
    });

    it('is updated when the both range bounds change', function(){
      base.setProperties({rangeStart: 4, rangeEnd: 6});
      expect(base.get('selection').mapBy('num')).to.not.include(3,7);
      expect(base.get('selection').mapBy('num')).to.include(4,6);
    });

    it('preserves the order of the source array', function(){
      expect(base.get('selection').mapBy('num')).to.deep.equal([4,7,7,3,6]);
      expect(base.get('selection').mapBy('index')).to.deep.equal([1,2,5,6,7]);
    });

    it('is updated then one of the elements in its dependent key gets updated its propertyKey', function(){
      base.get('selection')[0].set('num', 5);
      expect(base.get('selection').mapBy('num')).to.deep.equal([5,4,7,7,3,6]);
      base.get('selection')[5].set('num', 11);
      expect(base.get('selection').mapBy('num')).to.deep.equal([5,4,7,3,6]);
    });
  });
});
