describe('htmlEscape', function () {

  var Object = Ember.Object.extend({
    escaped: EmberCPM.Macros.htmlEscape('value')
  });

  it('returns undefined if the value is undefined', function() {
    expect(Object.create().get('escaped')).to.equal(undefined);
  });

  it('returns null if the value is null', function() {
    expect(Object.create({ value: null }).get('escaped')).to.equal(null);
  });

  it('HTML-escapes the value', function() {
    var tag = '<em>Hi</em>',
        escaped = '&lt;em&gt;Hi&lt;/em&gt;',
        actual = Object.create({ value: tag }).get('escaped').toString();
    expect(actual).to.equal(escaped);
  });

  it('Marks the result as safe', function() {
    var actual = Object.create({ value: '<img />' }).get('escaped');
    expect(actual instanceof Handlebars.SafeString).to.equal(true);
  });

});
