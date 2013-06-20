describe('among', function () {

  var Object = Ember.Object.extend({
    isCartoonDog: EmberCPM.Macros.among('value', 'Odie', 'Snoopy')
  });

  it('returns false if the value is not among the given values', function() {
    expect(Object.create({ value: 'Garfield' }).get('isCartoonDog')).to.equal(false);
  });

  it('returns true if the value is among the given values', function() {
    expect(Object.create({ value: 'Odie' }).get('isCartoonDog')).to.equal(true);
  });

});
