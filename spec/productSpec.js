describe('product', function () {

  var MyType = Ember.Object.extend({
    c: EmberCPM.Macros.product('a', 'b'),
    d: EmberCPM.Macros.product('a', 'c'),
    e: EmberCPM.Macros.product('a'),
    f: EmberCPM.Macros.product(),
    i: EmberCPM.Macros.product('a', 'b', 'g', 'h'),
    j: EmberCPM.Macros.product('a', 'b', 'g', 'h', 2),
    k: EmberCPM.Macros.product(EmberCPM.Macros.product('a', 'b'), 'h')
  });
  var myObj = MyType.create({
    a: 6,
    b: 7,
    g: 12,
    h: 4
  });

  it('is properly registered', function () {
    expect(!!EmberCPM.Macros.product).to.equal(true);
  });

  it('calculates the product of two basic numeric properties', function () {
    expect(myObj.get('c')).to.equal(42);
  });

  it('calculates the product of many numeric properties', function () {
    expect(myObj.get('i')).to.equal(2016);
  });

  it('calculates the product of many numeric properties, with a constant', function () {
    expect(myObj.get('j')).to.equal(4032);
  });

  it('responds to dependent property changes appropriately', function () {
    myObj.set('a', 5);
    expect(myObj.get('c')).to.equal(35);
  });

  it('evaluates nested properties appropriately', function () {
    expect(myObj.get('d')).to.equal(175);
  });

  it('given one argument, returns the value of that property', function () {
    expect(myObj.get('e')).to.equal(5);
  });

  it('given no arguments, returns 0', function () {
    expect(myObj.get('f')).to.equal(0);
  });

  it('product of product', function () {
    expect(myObj.get('k')).to.equal(140);
  });
});
