describe('sum', function () {
  var Object = Ember.Object.extend({
    total: EmberCPM.Macros.sum('amounts')
  });

  it('returns zero for an empty array', function() {
    expect(Object.create({ value: [] }).get('total')).to.equal(0);
  });

  it('returns returns the correct sum for a list', function() {
    var obj = Object.create({ amounts: [1, 1, 2, 3, 5, 8, 13] });
    expect(obj.get('total')).to.equal(33);

    obj.get("amounts").pushObject(21);
    expect(obj.get('total')).to.equal(54);
  });
});
