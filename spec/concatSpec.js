describe("concat", function() {
  function o(name) {
    return Ember.Object.create({
      name: name
    });
  }

  var Obj = Ember.Object.extend({
    allPeople: EmberCPM.Macros.concat('lannisters', 'starks')
  });

  var obj, array, lannisters, starks;

  beforeEach( function() {
    obj = Obj.create();
    obj.set('lannisters', Ember.A([o('Jaime'), o('Cersei')]));
    obj.set('starks', Ember.A([o('Robb'), o('Eddard')]));
  });


  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('concat');
  });

  it("is initially the concatenation of all its dependent arrays", function() {
    array = obj.get('allPeople');

    expect(array.mapProperty('name')).to.deep.equal(['Jaime', 'Cersei', 'Robb', 'Eddard']);
  });

  it("updates when new items are inserted in its dependent arrays", function() {
    lannisters = obj.get('lannisters');
    starks = obj.get('starks');
    array = obj.get('allPeople');

    lannisters.insertAt(1, o('Tyrion'));
    expect(array.mapProperty('name')).to.deep.equal(['Jaime', 'Tyrion', 'Cersei', 'Robb', 'Eddard']);

    starks.insertAt(1, o('Bran'));
    expect(array.mapProperty('name')).to.deep.equal(['Jaime', 'Tyrion', 'Cersei', 'Robb', 'Bran', 'Eddard']);
  });

  it("updates when items are removed from its dependent arrays", function() {
    lannisters = obj.get('lannisters');
    starks = obj.get('starks');
    array = obj.get('allPeople');

    lannisters.removeAt(0);
    starks.removeAt(1);

    expect(array.mapProperty('name')).to.deep.equal(['Cersei', 'Robb']);
  });

  it("responds to `replace` in its dependent arrays", function() {
    lannisters = obj.get('lannisters');
    array = obj.get('allPeople');

    lannisters.replace(0, 2, [o('Tytos'), o('Tywin')]);
    expect(array.mapProperty('name')).to.deep.equal(['Tytos', 'Tywin', 'Robb', 'Eddard']);
  });

  it("updates correctly for initial dependent arrays updated via `set`", function() {
    lannisters = [o('Tytos'), o('Tywin')];
    array = obj.get('allPeople');

    Ember.run(function() {
      obj.set('lannisters', lannisters);
    });
    expect(array.mapProperty('name')).to.deep.equal(['Tytos', 'Tywin', 'Robb', 'Eddard']);
  });

  it("updates correctly for subsequent dependent arrays updated via `set`", function() {
    starks = [o('Sansa'), o('Arya')];
    array = obj.get('allPeople');

    Ember.run(function() {
      obj.set('starks', starks);
    });
    expect(array.mapProperty('name')).to.deep.equal(['Jaime', 'Cersei', 'Sansa', 'Arya']);
  });

  it("updates correctly when dependent arrays are swapped", function() {
    var lannisters = obj.get('lannisters'),
        starks = obj.get('starks'),
        array = obj.get('allPeople');

    Ember.run(function() {
      obj.set('lannisters', starks);
      obj.set('starks', lannisters);
    });

    expect(array.mapProperty('name')).to.deep.equal(['Robb', 'Eddard', 'Jaime', 'Cersei']);
  });

  it("updates correctly when multiple dependent keys are the same array", function() {
    array = obj.get('allPeople');

    Ember.run(function() {
      obj.set('lannisters', obj.get('starks'));
    });

    expect(array.mapProperty('name')).to.deep.equal(['Robb', 'Eddard', 'Robb', 'Eddard']);
    expect(array[0]).to.equal(array[2]);
    expect(array[1]).to.equal(array[3]);
  });

  it("ignores null or undefined dependent arrays", function() {
    array = obj.get('allPeople');

    Ember.run(function() {
      obj.set('lannisters', undefined);
    });
    expect(array.mapProperty('name')).to.deep.equal(['Robb', 'Eddard']);

    Ember.run(function() {
      obj.set('starks', undefined);
    });
    expect(array.mapProperty('name')).to.deep.equal([]);
  });

  it("concatenates multiple arrays", function() {
    Obj = Ember.Object.extend({
      allPeople: EmberCPM.Macros.concat('lannisters', 'starks', 'boltons')
    });
    obj = Obj.create({
      lannisters: Ember.A([o('Jaime'), o('Cersei')]),
      starks: Ember.A([o('Robb'), o('Eddard')]),
      boltons: Ember.A([o('Ramsey'), o('Roose')]),
    });
    expect(obj.get('allPeople').mapProperty('name')).to.deep.equal(['Jaime', 'Cersei', 'Robb', 'Eddard', 'Ramsey', 'Roose']);
  });
});
