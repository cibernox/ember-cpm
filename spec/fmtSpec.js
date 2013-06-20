describe('fmt', function () {

  var Object = Ember.Object.extend({
    starred: EmberCPM.Macros.fmt('value', '** %@ **')
  });

  it('returns undefined if the value is undefined', function() {
    expect(Object.create().get('starred')).to.equal(undefined);
  });

  it('returns null if the value is null', function() {
    expect(Object.create({ value: null }).get('starred')).to.equal(null);
  });

  it('injects the value into the format-string', function() {
    expect(Object.create({ value: 'Hello' }).get('starred')).to.equal('** Hello **');
  });

});
