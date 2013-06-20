describe('notMatch', function () {

  var Object = Ember.Object.extend({
    digitless: EmberCPM.Macros.notMatch('value', /\d/)
  });

  it('returns false if the value matches', function() {
    expect(Object.create({ value: '12 Monkeys' }).get('digitless')).to.equal(false);
  });

  it('returns true if the value does not match', function() {
    expect(Object.create({ value: 'Three Amigos' }).get('digitless')).to.equal(true);
  });

  it('returns true if the value is undefined', function() {
    expect(Object.create().get('digitless')).to.equal(true);
  });

  it('returns true if the value is null', function() {
    expect(Object.create({ value: null }).get('digitless')).to.equal(true);
  });

  it('returns true if the value is a non-string', function() {
    expect(Object.create({ value: 595 }).get('digitless')).to.equal(true);
  });

});
