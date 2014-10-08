
describe('difference', function () {

  var MyType = Ember.Object.extend({
    c: EmberCPM.Macros.difference('a', 'b'),
    d: EmberCPM.Macros.difference('a', 3),
    e: EmberCPM.Macros.difference(3, 'a'),
    f: EmberCPM.Macros.difference(),
    g: EmberCPM.Macros.difference('a'),
    h: EmberCPM.Macros.difference(Ember.computed.alias('a'), 2),
    i: EmberCPM.Macros.difference(EmberCPM.Macros.sum('a', 'b'), 4)
  });

  var myObj = MyType.create({
    a: 6,
    b: 2
  });

  it('is properly registered', function () {
    expect(!!EmberCPM.Macros.difference).to.equal(true);
  });

  it('calculates the difference of two basic numeric properties', function () {
    expect(myObj.get('c')).to.equal(4);
    myObj.set('a', 8);
    expect(myObj.get('c')).to.equal(6);
    myObj.set('a', 6);
  });

  it('calculates the difference of a numeric property and a numeric literal', function () {
    expect(myObj.get('d')).to.equal(3);
    expect(myObj.get('e')).to.equal(-3);
    myObj.set('a', 8);
    expect(myObj.get('d')).to.equal(5);
    expect(myObj.get('e')).to.equal(-5);
    myObj.set('a', 6);
  });

  it('zero argument case', function () {
    expect(myObj.get('f')).to.equal(0);
  });

  it('one argument case', function () {
    expect(myObj.get('g')).to.equal(6);
  });

  it('composable properties case', function () {
    expect(myObj.get('h')).to.equal(4);
    expect(myObj.get('i')).to.equal(4);
    myObj.set('a', 8);
    expect(myObj.get('h')).to.equal(6);
    expect(myObj.get('i')).to.equal(6);
    myObj.set('a', 6);
  });
});
