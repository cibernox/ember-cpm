describe('utils - basics', function () {

  it('should exist', function () {
    expect(!!EmberCPM._utils).to.equal(true);
  });

  it('retainByType - should exist', function () {
    expect(!!EmberCPM._utils.retainByType).to.equal(true);
  });

});


describe('utils - getVal', function () {

  var getVal = EmberCPM._utils.getVal,
    MyType = Ember.Object.extend({
      a: 'A',
      b: Ember.computed.equal('a', 'B'),
      c: 5
    });
  var myObj = MyType.create();

  it('getVal - get numeric property', function () {
    expect(getVal.call(myObj,'c')).to.equal(5);
  });

  it('getVal - get string property', function () {
    expect(getVal.call(myObj,'a')).to.equal('A');
  });

  it('getVal - get string non-property', function () {
    expect(getVal.call(myObj,'abc')).to.equal('abc');
  });

});


describe('utils - retainByType', function () {

  var x = ['a', 'b', 'c', 123, 456, {hello: 'world'}, [1,2,4], undefined, undefined, null],
    retainByType = EmberCPM._utils.retainByType;

  it('retainByType - retain strings', function () {
    expect(retainByType(x, 'string')).to.eql(['a', 'b', 'c']);
  });

  it('retainByType - retain numbers', function () {
    expect(retainByType(x, 'number')).to.eql([123, 456]);
  });

  it('retainByType - retain objects', function () {
    expect(retainByType(x, 'object')).to.eql([{hello: 'world'}]);
  });

  it('retainByType - retain arrays', function () {
    expect(retainByType(x, 'array')).to.eql([[1,2,4]]);
  });

  it('retainByType - retain undefined', function () {
    expect(retainByType(x, 'undefined')).to.eql([undefined, undefined]);
  });

  it('retainByType - retain null', function () {
    expect(retainByType(x, 'null')).to.eql([null]);
  });
});
