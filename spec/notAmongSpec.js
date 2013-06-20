describe('notAmong', function () {

  var Object = Ember.Object.extend({
    notCartoonDog: EmberCPM.Macros.notAmong('value', 'Odie', 'Snoopy')
  });

  it('returns false if the value is among the given values', function() {
    expect(Object.create({ value: 'Snoopy' }).get('notCartoonDog')).to.equal(false);
  });

  it('returns true if the value is not among the given values', function() {
    expect(Object.create({ value: 'Garfield' }).get('notCartoonDog')).to.equal(true);
  });

});
