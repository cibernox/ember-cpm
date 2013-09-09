describe('fmt', function () {

  var Object = Ember.Object.extend({
    starred: EmberCPM.Macros.fmt('value', '** %@ **'),
    labeled: EmberCPM.Macros.fmt('label', 'value', '%@: %@')
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

  it('returns undefined if *any* of the values is undefined', function() {
    var o = Object.create({ label: "Name" });
    expect(o.get('labeled')).to.equal(undefined);
  });

  it('returns null if *any* of the values is null', function() {
    var o = Object.create({ value: "Kaylee" });
    expect(o.get('labeled')).to.equal(undefined);
  });

  it('injects multiple values into the format-string', function() {
    var o = Object.create({ label: 'Name', value: "Kaylee" });
    expect(o.get('labeled')).to.equal('Name: Kaylee');
  });

  it('recomputes', function() {
    var o = Object.create({ label: 'Name', value: "Kaylee" });
    Ember.run(function() { o.set('label', 'First Name'); });
    expect(o.get('labeled')).to.equal('First Name: Kaylee');
  });

});
