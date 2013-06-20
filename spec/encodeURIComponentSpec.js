describe('encodeURIComponent', function () {

  var Object = Ember.Object.extend({
    encoded: EmberCPM.Macros.encodeURIComponent('value')
  });

  it('returns undefined if the value is undefined', function() {
    expect(Object.create().get('encoded')).to.equal(undefined);
  });

  it('returns null if the value is null', function() {
    expect(Object.create({ value: null }).get('encoded')).to.equal(null);
  });

  it('URI-encodes values (as URI components)', function() {
    var url      = 'http://example.com/one and two',
        expected = 'http%3A%2F%2Fexample.com%2Fone%20and%20two';
    expect(Object.create({ value: url }).get('encoded')).to.equal(expected);
  });

});
