describe('Backported Macros', function() {

  it('empty', function() {
    var Object = Ember.Object.extend({ empty: EmberCPM.Macros.empty('value') });

    expect(Object.create().get('empty')).to.equal(true);
    expect(Object.create({ value: null }).get('empty')).to.equal(true);
    expect(Object.create({ value: [] }).get('empty')).to.equal(true);
    expect(Object.create({ value: '' }).get('empty')).to.equal(true);

    expect(Object.create({ value: [0] }).get('empty')).to.equal(false);
    expect(Object.create({ value: '0' }).get('empty')).to.equal(false);
  });

  it('notEmpty', function() {
    var Object = Ember.Object.extend({ notEmpty: EmberCPM.Macros.notEmpty('value') });

    expect(Object.create().get('notEmpty')).to.equal(false);
    expect(Object.create({ value: null }).get('notEmpty')).to.equal(false);
    expect(Object.create({ value: [] }).get('notEmpty')).to.equal(false);
    expect(Object.create({ value: '' }).get('notEmpty')).to.equal(false);

    expect(Object.create({ value: [0] }).get('notEmpty')).to.equal(true);
    expect(Object.create({ value: '0' }).get('notEmpty')).to.equal(true);
  });

  it('none', function() {
    var Object = Ember.Object.extend({ none: EmberCPM.Macros.none('value') });

    expect(Object.create().get('none')).to.equal(true);
    expect(Object.create({ value: null }).get('none')).to.equal(true);

    expect(Object.create({ value: [] }).get('none')).to.equal(false);
    expect(Object.create({ value: '' }).get('none')).to.equal(false);
    expect(Object.create({ value: [0] }).get('none')).to.equal(false);
    expect(Object.create({ value: '0' }).get('none')).to.equal(false);
  });

  it('not', function() {
    var Object = Ember.Object.extend({ not: EmberCPM.Macros.not('value') });

    expect(Object.create().get('not')).to.equal(true);
    expect(Object.create({ value: null }).get('not')).to.equal(true);
    expect(Object.create({ value: 0 }).get('not')).to.equal(true);
    expect(Object.create({ value: false }).get('not')).to.equal(true);
    expect(Object.create({ value: '' }).get('not')).to.equal(true);

    expect(Object.create({ value: [] }).get('not')).to.equal(false);
    expect(Object.create({ value: true }).get('not')).to.equal(false);
  });

  it('bool', function() {
    var Object = Ember.Object.extend({ bool: EmberCPM.Macros.bool('value') });

    expect(Object.create().get('bool')).to.equal(false);
    expect(Object.create({ value: null }).get('bool')).to.equal(false);
    expect(Object.create({ value: 0 }).get('bool')).to.equal(false);
    expect(Object.create({ value: false }).get('bool')).to.equal(false);
    expect(Object.create({ value: '' }).get('bool')).to.equal(false);

    expect(Object.create({ value: [] }).get('bool')).to.equal(true);
    expect(Object.create({ value: true }).get('bool')).to.equal(true);
  });

  it('match', function() {
    var Object = Ember.Object.extend({ match: EmberCPM.Macros.match('value', /regex/) });

    expect(Object.create().get('match')).to.equal(false);
    expect(Object.create({ value: null }).get('match')).to.equal(false);
    expect(Object.create({ value: 'no reg ex' }).get('match')).to.equal(false);

    expect(Object.create({ value: 'string with regex' }).get('match')).to.equal(true);
  });

  it('equal', function() {
    var Object = Ember.Object.extend({ equal: EmberCPM.Macros.equal('value', 'target value') });

    expect(Object.create().get('equal')).to.equal(false);
    expect(Object.create({ value: null }).get('equal')).to.equal(false);
    expect(Object.create({ value: 'not the value' }).get('equal')).to.equal(false);

    expect(Object.create({ value: 'target value' }).get('equal')).to.equal(true);
  });

  it('gt', function() {
    var Object = Ember.Object.extend({ gt: EmberCPM.Macros.gt('value', 0) });

    expect(Object.create({ value: -1 }).get('gt')).to.equal(false);
    expect(Object.create({ value: 0 }).get('gt')).to.equal(false);
    expect(Object.create({ value: 1 }).get('gt')).to.equal(true);
  });

  it('gte', function() {
    var Object = Ember.Object.extend({ gte: EmberCPM.Macros.gte('value', 0) });

    expect(Object.create({ value: -1 }).get('gte')).to.equal(false);
    expect(Object.create({ value: 0 }).get('gte')).to.equal(true);
    expect(Object.create({ value: 1 }).get('gte')).to.equal(true);
  });

  it('lt', function() {
    var Object = Ember.Object.extend({ lt: EmberCPM.Macros.lt('value', 0) });

    expect(Object.create({ value: -1 }).get('lt')).to.equal(true);
    expect(Object.create({ value: 0 }).get('lt')).to.equal(false);
    expect(Object.create({ value: 1 }).get('lt')).to.equal(false);
  });

  it('lte', function() {
    var Object = Ember.Object.extend({ lte: EmberCPM.Macros.lte('value', 0) });

    expect(Object.create({ value: -1 }).get('lte')).to.equal(true);
    expect(Object.create({ value: 0 }).get('lte')).to.equal(true);
    expect(Object.create({ value: 1 }).get('lte')).to.equal(false);
  });

  it('and', function() {
    var Object = Ember.Object.extend({ and: EmberCPM.Macros.and('value', 'otherValue') });

    expect(Object.create({ value: true }).get('and')).to.equal(false);
    expect(Object.create({ value: true, otherValue: false }).get('and')).to.equal(false);

    expect(Object.create({ value: true, otherValue: true }).get('and')).to.equal(true);
  });

  it('or', function() {
    var Object = Ember.Object.extend({ or: EmberCPM.Macros.or('value', 'otherValue') });

    expect(Object.create({ value: false }).get('or')).to.equal(false);
    expect(Object.create({ value: false, otherValue: false }).get('or')).to.equal(false);

    expect(Object.create({ value: false, otherValue: true }).get('or')).to.equal(true);
  });

  it('any', function() {
    var Object = Ember.Object.extend({ any: EmberCPM.Macros.any('value', 'otherValue') });

    expect(Object.create().get('any')).to.equal(null);
    expect(Object.create({ value: false, otherValue: 'bar' }).get('any')).to.equal('bar');
    expect(Object.create({ value: 'foo', otherValue: 'bar' }).get('any')).to.equal('foo');
  });

  it('map', function() {
    var Object = Ember.Object.extend({ map: EmberCPM.Macros.map('value', 'otherValue') });

    expect(Object.create().get('map')).to.eql([ null, null ]);
    expect(Object.create({ value: null, otherValue: 'bar' }).get('map')).to.eql([ null, 'bar' ]);
  });

  it('alias', function() {
    var Object = Ember.Object.extend({ alias: EmberCPM.Macros.alias('farm.name') });

    var o = Object.create({ farm: { name: 'initial value' } });
    expect(o.get('alias')).to.equal('initial value');

    Ember.run(function() { o.set('alias', 'new value'); });
    expect(o.get('alias')).to.equal('new value');
    expect(o.getPath('farm.name')).to.equal('new value');

    Ember.run(function() { o.set('farm', { name: 'updated value' }); });
    expect(o.get('alias')).to.equal('updated value');
  });

  it('oneWay', function() {
    var Object = Ember.Object.extend({ oneWay: EmberCPM.Macros.oneWay('value') });

    var o = Object.create({ value: 'initial value' });
    expect(o.get('oneWay')).to.equal('initial value');

    Ember.run(function() { o.set('oneWay', 'new downstream value'); });
    expect(o.get('oneWay')).to.equal('new downstream value');
    expect(o.get('value')).to.equal('initial value');

    Ember.run(o, 'set', 'value', 'new upstream value');
    expect(o.get('oneWay')).to.equal('new downstream value');
  });

  it('readOnly', function() {
    var Object = Ember.Object.extend({ readOnly: EmberCPM.Macros.readOnly('value') });

    var o = Object.create({ value: 'initial value' });
    expect(o.get('readOnly')).to.equal('initial value');

    Ember.run(o, 'set', 'readOnly', 'new downstream value');
    expect(o.get('readOnly')).to.equal('initial value');

    Ember.run(o, 'set', 'value', 'new upstream value');
    expect(o.get('readOnly')).to.equal('new upstream value');
  });

  it('defaultTo', function() {
    var Object = Ember.Object.extend({ defaultTo: EmberCPM.Macros.defaultTo('value') });

    var o = Object.create({ value: 'initial value' });
    expect(o.get('defaultTo')).to.equal('initial value');

    Ember.run(function() { o.set('defaultTo', 'new value'); });
    expect(o.get('defaultTo')).to.equal('new value');

    Ember.run(function() { o.set('value', 'updated value'); });
    expect(o.get('defaultTo')).to.equal('new value');
  });

});
