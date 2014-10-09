
describe('quotient', function () {

  var MyType = Ember.Object.extend({
    c: EmberCPM.Macros.quotient('a', 'b'),
    d: EmberCPM.Macros.quotient('a', 3),
    e: EmberCPM.Macros.quotient(3, 'a'),
    f: EmberCPM.Macros.quotient(),
    g: EmberCPM.Macros.quotient('a'),
    h: EmberCPM.Macros.quotient(Ember.computed.alias('a'), 2)
  });

  var myObj = MyType.create({
    a: 6,
    b: 2,
    arr: [1, 2, 4]
  });

  it('is properly registered', function () {
    expect(!!EmberCPM.Macros.quotient).to.equal(true);
  });

  it('calculates the quotient of two basic numeric properties', function () {
    expect(myObj.get('c')).to.equal(3);
    myObj.set('a', 8);
    expect(myObj.get('c')).to.equal(4);
    myObj.set('a', 6);
  });

  it('calculates the quotient of a numeric property and a numeric literal', function () {
    expect(myObj.get('d')).to.equal(2);
    expect(myObj.get('e')).to.equal(0.5);
    myObj.set('a', 12);
    expect(myObj.get('d')).to.equal(4);
    expect(myObj.get('e')).to.equal(0.25);
    myObj.set('a', 6);
  });

  it('zero argument case', function () {
    expect(myObj.get('f')).to.equal(0);
  });

  it('single argument case', function () {
    expect(myObj.get('g')).to.equal(6);
    myObj.set('a', 7);
    expect(myObj.get('g')).to.equal(7);
    myObj.set('a', 6);
  });

  it('composable CPM support', function () {
    expect(myObj.get('h')).to.equal(3);
    myObj.set('a', 5);
    expect(myObj.get('h')).to.equal(2.5);
    myObj.set('a', 6);
  });
});
