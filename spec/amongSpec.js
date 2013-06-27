describe('among', function () {

  var Object = Ember.Object.extend({
    hasCartoonDog: EmberCPM.Macros.among('pet.name', 'Odie', 'Snoopy')
  });

  it('returns false if the value is not among the given values', function() {
    expect(Object.create({ pet: { name: 'Garfield' } }).get('hasCartoonDog')).to.equal(false);
  });

  it('returns true if the value is among the given values', function() {
    expect(Object.create({ pet: { name: 'Odie' } }).get('hasCartoonDog')).to.equal(true);
  });

});
