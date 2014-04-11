describe('averageBy', function() {
  var objects, base;

  beforeEach(function() {
    objects = Ember.A([]);
    objects.push({blammo: 12},
                 {blammo: 10});

    base = Ember.Object.extend({
      objects: objects,

      average: EmberCPM.Macros.averageBy('objects', 'blammo')
    }).create();
  });

  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('averageBy');
  });

  it("computes the average of integers", function(){
    expect(base.get('average')).to.equal(11);
  });

  it("computes the average of floats", function(){
    objects.pushObject({blammo: 10.55});

    expect(base.get('average')).to.equal(10.85);
  });

  it("recomputes on change", function(){
    expect(base.get('average')).to.equal(11);

    objects.pushObject({blammo: 10.25});

    expect(base.get('average')).to.equal(10.75);
  });

  it("recalculates upon changing an item", function(){
    expect(base.get('average')).to.equal(11);

    var last = objects.get('lastObject');
    Ember.set(last, 'blammo', 5);

    expect(base.get('average')).to.equal(8.5);
  });

  it("can be used on an ArrayProxy itself", function(){
    base = Ember.ArrayProxy.extend({
      content: objects,
      average: EmberCPM.Macros.averageBy('@this', 'blammo')
    }).create();

    expect(base.get('average')).to.equal(11);

    var last = objects.get('lastObject');
    Ember.set(last, 'blammo', 5);

    expect(base.get('average')).to.equal(8.5);

    objects.pushObject({blammo: 15});

    expect(base.get('average')).to.equal(10.666666666666666);

    objects.popObject();

    expect(base.get('average')).to.equal(8.5);
  });
});
