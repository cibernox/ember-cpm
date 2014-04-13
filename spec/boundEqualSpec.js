describe('boundEqual', function() {
  var objects, base;

  beforeEach(function() {
    base = Ember.Object.extend({
      areEqual: EmberCPM.Macros.boundEqual('value1', 'value2')
    }).create({
      value1: "Blazorz",
      value2: "Blazorz"
    });
  });

  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('boundEqual');
  });

  it('returns true when both properties are equal', function() {
    expect(base.get('areEqual')).to.equal(true);
  });

  it('recalculates on changing first value', function() {
    expect(base.get('areEqual')).to.equal(true);

    base.set('value1', 'Yonk');

    expect(base.get('areEqual')).to.equal(false);
  });

  it('recalculates on changing second value', function() {
    expect(base.get('areEqual')).to.equal(true);

    base.set('value2', 'Yonk');

    expect(base.get('areEqual')).to.equal(false);
  });

  it('will lookup chained properties', function() {
    base = Ember.Object.extend({
      areEqual: EmberCPM.Macros.boundEqual('firstPerson.name', 'secondPerson.name')
    }).create({
      firstPerson: {name: 'Robert'},
      secondPerson: {name: 'Lin'}
    });

    expect(base.get('areEqual')).to.equal(false);

    base.set('firstPerson.name', 'Lin');

    expect(base.get('areEqual')).to.equal(true);
  })
});
