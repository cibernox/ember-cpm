describe('notMatch', function () {

  var Object = Ember.Object.extend({
    digitless: EmberCPM.Macros.notMatch('movie.title', /\d/)
  });

  it('returns false if the value matches', function() {
    expect(Object.create({ movie: { title: '12 Monkeys' } }).get('digitless')).to.equal(false);
  });

  it('returns true if the value does not match', function() {
    expect(Object.create({ movie: { title: 'Three Amigos' } }).get('digitless')).to.equal(true);
  });

  it('returns true if the value is undefined', function() {
    expect(Object.create().get('digitless')).to.equal(true);
  });

  it('returns true if the value is null', function() {
    expect(Object.create({ movie: { title: null } }).get('digitless')).to.equal(true);
  });

  it('returns true if the value is a non-string', function() {
    expect(Object.create({ movie: { title: 595 } }).get('digitless')).to.equal(true);
  });

});
