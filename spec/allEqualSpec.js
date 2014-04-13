describe('allEqual', function() {
  var object;

  beforeEach(function(){
    object = {
      value1: "Blazorz",
      value2: "Blazorz",
      value3: "Blazorz",
      value4: "Blazorz",
      value5: "Blazorz"
    };
  });

  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('allEqual');
  });

  it('can accept any number of dependent keys', function() {
    var base = Ember.Object.extend({
      areEqual: EmberCPM.Macros.allEqual('value1', 'value2', 'value3', 'value4', 'value5')
    }).create(object);

    expect(base.get('areEqual')).to.equal(true);

    base.set('value3', 'KABLAM');

    expect(base.get('areEqual')).to.equal(false);
  });

  it('can accept an array', function() {
    var base = Ember.Object.extend({
      areEqual: EmberCPM.Macros.allEqual(['value1', 'value2', 'value3', 'value4', 'value5'])
    }).create(object);

    expect(base.get('areEqual')).to.equal(true);

    base.set('value5', 'KABLAM');

    expect(base.get('areEqual')).to.equal(false);
  });

  it('can accept nested dependent keys', function() {
    object.nested = {value: 'Blazorz'};

    var base = Ember.Object.extend({
      areEqual: EmberCPM.Macros.allEqual('value1', 'value2', 'nested.value')
    }).create(object);

    expect(base.get('areEqual')).to.equal(true);

    base.set('nested.value', 'KABLAM');

    expect(base.get('areEqual')).to.equal(false);
  });
});
