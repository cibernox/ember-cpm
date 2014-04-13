describe('quotient', function() {
  var objects, base;

  beforeEach(function() {
    base = Ember.Object.extend({
      quotient: EmberCPM.Macros.quotient('numerator', 'denominator')
    }).create({
      numerator: 10,
      denominator: 10
    });
  });


  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('quotient');
  });

  it('should divide numerator by denominator', function(){
    expect(base.get('quotient')).to.equal(1);
  });

  it('should recompute if numerator changes', function(){
    expect(base.get('quotient')).to.equal(1);

    base.incrementProperty('numerator', 10);

    expect(base.get('quotient')).to.equal(2);
  });

  it('should recompute if denominator changes', function(){
    expect(base.get('quotient')).to.equal(1);

    base.decrementProperty('denominator', 5);

    expect(base.get('quotient')).to.equal(2);
  });

  it('should calculate properly when denomiator is a float', function(){
    base.set('denominator', 0.5);

    expect(base.get('quotient')).to.equal(20);
  });

  it('should calculate properly when numerator is a float', function(){
    base.set('numerator', 0.5);

    expect(base.get('quotient')).to.equal(0.05);
  });

  it('should return standard JS quotient', function(){
    base.set('numerator', 10);
    base.set('denominator', 3);

    expect(base.get('quotient')).to.equal(10/3);
  });
});

