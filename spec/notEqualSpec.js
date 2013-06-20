describe('notEqual', function () {

  var Object = Ember.Object.extend({
    isNotTwelve: EmberCPM.Macros.notEqual('value', 12)
  });

  it('returns false if the value is equal', function() {
    expect(Object.create({ value: 12 }).get('isNotTwelve')).to.equal(false);
  });

  it('returns true if the value is not equal', function() {
    expect(Object.create({ value: 99419 }).get('isNotTwelve')).to.equal(true);
  });

});
