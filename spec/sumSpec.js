describe('sum', function () {
  var Object = Ember.Object.extend({
    total: EmberCPM.Macros.sum('values')
  });

  it('returns zero for an empty array', function() {
    expect(Object.create({ values: [] }).get('total')).to.equal(0);
  });

  it('returns returns the correct sum for a list', function() {
    var obj = Object.create({ values: [1, 1, 2, 3, 5, 8, 13] });
    expect(obj.get('total')).to.equal(33);

    obj.get("values").pushObject(21);
    expect(obj.get('total')).to.equal(54);

    obj.get("values").removeAt(5); // 8
    expect(obj.get('total')).to.equal(46);
  });

  it('non-number elements have no effect on the total', function() {
    var obj = Object.create({ values: [
      1,
      null,
      undefined,
      true,
      false,
      "string",
      {},
      [],
      function(){},
      2
    ] });

    expect(obj.get('total')).to.equal(3);

    obj.get("values").removeAt(6); // {}
    expect(obj.get('total')).to.equal(3);

    obj.get("values").pushObject({custom: "object"});
    expect(obj.get('total')).to.equal(3);


    obj.get("values").pushObject(3);
    expect(obj.get('total')).to.equal(6);

    obj.get("values").removeAt(0);
    expect(obj.get('total')).to.equal(5);
  });
});
