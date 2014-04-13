describe('product', function() {
  var objects, base;

  beforeEach(function() {
    base = Ember.Object.extend({
      product: EmberCPM.Macros.product('multiplicand', 'multiplier')
    }).create({
      multiplicand: 10,
      multiplier: 10
    });
  });


  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('product');
  });

  it('multiplies two numbers correctly', function() {
    expect(base.get('product')).to.equal(100);
  });

  it('recalculates on changing multiplicand', function() {
    expect(base.get('product')).to.equal(100);

    base.set('multiplicand', 5);

    expect(base.get('product')).to.equal(50);
  });

  it('recalculates on changing multiplier', function() {
    expect(base.get('product')).to.equal(100);

    base.set('multiplier', 4);

    expect(base.get('product')).to.equal(40);
  });

  it('multiplies two floats correctly', function() {
    base.set('multiplier', 5.5);
    base.set('multiplicand', 10.1);

    expect(base.get('product')).to.equal(55.55);
  });

  it('multiplies two strings correctly', function() {
    base.set('multiplier', "5.5");
    base.set('multiplicand', "10.1");

    expect(base.get('product')).to.equal(55.55);
  });
});
