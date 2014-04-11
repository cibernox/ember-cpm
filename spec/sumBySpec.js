describe('sumBy', function() {
  var objects, base;

  beforeEach(function() {
    objects = Ember.A([]);
    objects.push({blammo: 10},
                 {blammo: 10});

    base = Ember.Object.extend({
      objects: objects,
      sum: EmberCPM.Macros.sumBy('objects', 'blammo')
    }).create();
  });


  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('sumBy');
  });

  it("can accept two parameters (dependentKey, and propertyKey)", function(){
    base = Ember.Object.extend({
      objects: objects,
      sum: EmberCPM.Macros.sumBy('objects', 'blammo')
    }).create();

    expect(base.get('sum')).to.equal(20);

    objects.popObject();

    expect(base.get('sum')).to.equal(10);
  });

  it("adds items together", function(){
    expect(base.get('sum')).to.equal(20);
  });

  it("adds float values", function(){
    objects.pushObject({blammo: 5.73});

    expect(base.get('sum')).to.equal(25.73);
  });

  it("removes float values", function(){
    var floatObj = {blammo: 5.73};

    objects.pushObject(floatObj);
    expect(base.get('sum')).to.equal(25.73);

    objects.removeObject(floatObj);
    expect(base.get('sum')).to.equal(20);
  });

  it("recalculates upon adding an item", function(){
    expect(base.get('sum')).to.equal(20);

    objects.pushObject({blammo: 15});

    expect(base.get('sum')).to.equal(35);
  });

  it("should recalculate upon removing", function(){
    expect(base.get('sum')).to.equal(20);

    objects.popObject();

    expect(base.get('sum')).to.equal(10);
  });

  it("recalculates upon changing an item", function(){
    expect(base.get('sum')).to.equal(20);

    var last = objects.get('lastObject');
    Ember.set(last, 'blammo', 5);

    expect(base.get('sum')).to.equal(15);
  });

  it("can be used on an ArrayProxy itself", function(){
    base = Ember.ArrayProxy.extend({
      content: objects,
      sum: EmberCPM.Macros.sumBy('@this', 'blammo')
    }).create();

    expect(base.get('sum')).to.equal(20);

    var last = objects.get('lastObject');
    Ember.set(last, 'blammo', 5);

    expect(base.get('sum')).to.equal(15);

    objects.pushObject({blammo: 15});

    expect(base.get('sum')).to.equal(30);

    objects.popObject();

    expect(base.get('sum')).to.equal(15);
  });
});
