describe('safeString', function () {

  var Object = Ember.Object.extend({
    safe: EmberCPM.Macros.safeString('value')
  });

  it('returns undefined if the value is undefined', function() {
    expect(Object.create().get('safe')).to.equal(undefined);
  });

  it('returns null if the value is null', function() {
    expect(Object.create({ value: null }).get('safe')).to.equal(null);
  });

  it('returns a safe version of the value', function() {
    var actual = Object.create({ value: 'Wombat' }).get('safe');
    expect(actual.toString()).to.equal('Wombat');
    expect(actual instanceof Handlebars.SafeString).to.equal(true);
  });

});
