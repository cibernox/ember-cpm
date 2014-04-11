describe('difference', function() {
  var objects, base;

  beforeEach(function() {
    base = Ember.Object.extend({
      difference: EmberCPM.Macros.difference('minuend', 'subtrahend')
    }).create({
      minuend: 100,
      subtrahend: 10
    });
  });

  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('difference');
  });

  it('computes the difference between two numbers', function() {
    expect(base.get('difference')).to.equal(90);
  });

  it('recalculates on changing minuend', function() {
    expect(base.get('difference')).to.equal(90);

    base.set('minuend', 50);

    expect(base.get('difference')).to.equal(40);
  });

  it('recalculates on changing subtrahend', function() {
    expect(base.get('difference')).to.equal(90);

    base.set('subtrahend', 20);

    expect(base.get('difference')).to.equal(80);
  });

  it('computes the difference between two floats', function() {
    base.set('minuend', 50.5);
    base.set('subtrahend', 25.7);

    expect(base.get('difference')).to.equal(24.8);
  });

});

