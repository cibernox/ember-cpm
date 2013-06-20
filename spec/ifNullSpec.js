describe('ifNull', function () {

  var Object = Ember.Object.extend({
    orSushi: EmberCPM.Macros.ifNull('value', 'Sushi')
  });

  it('returns the default if the value is undefined', function() {
    expect(Object.create().get('orSushi')).to.equal('Sushi');
  });

  it('returns the default if the value is null', function() {
    expect(Object.create({ value: null }).get('orSushi')).to.equal('Sushi');
  });

  it('returns the value if it is not null or undefined', function() {
    expect(Object.create({ value: 'Ramen' }).get('orSushi')).to.equal('Ramen');
  });

  it('returns other falsy values', function() {
    expect(Object.create({ value: false }).get('orSushi')).to.equal(false);
    expect(Object.create({ value: 0 }).get('orSushi')).to.equal(0);
  });

});
