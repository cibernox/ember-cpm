describe("groupBy", function() {
  function o(options) {
    return Ember.Object.create(options);
  }

  function getInputArray() {
    return Ember.A([
      o({name: 'Jack', browser: 'firefox'}),
      o({name: 'Jacob', browser: 'chrome'}),
      o({name: 'James', browser: 'firefox'}),
      o({name: 'Jeremy', browser: 'chrome'})
    ]);
  }

  var Obj = Ember.Object.extend({
    model: null,
    groupedModel: EmberCPM.Macros.groupBy('model', 'browser')
  });

  // Basic

  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('groupBy');
  });

  it('inserts initial elements correctly', function() {
    var inputArray = getInputArray();
    var groups = Obj.create({model: inputArray}).get('groupedModel');

    expect(groups.findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['Jack', 'James']);
    expect(groups.findBy('value', 'chrome').get('items').mapBy('name')).to.deep.equal(['Jacob', 'Jeremy']);
  });

  it("is empty for a null or empty array", function() {
    var groups;

    groups = Obj.create({model: Ember.A()}).get('groupedModel');
    expect(Ember.isEmpty(groups)).to.equal(true);

    groups = Obj.create({model: null}).get('groupedModel');
    expect(Ember.isEmpty(groups)).to.equal(true);

    groups = Obj.create({model: undefined}).get('groupedModel');
    expect(Ember.isEmpty(groups)).to.equal(true);
  });

  // Insertion

  it("inserts items correctly at the beginning", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.insertAt(0, o({name: 'Jeff', browser: 'firefox'}));
    expect(obj.get('groupedModel').findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['Jeff', 'Jack', 'James']);
  });

  it("inserts items correctly in the middle", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.insertAt(2, o({name: 'Jeff', browser: 'firefox'}));
    expect(obj.get('groupedModel').findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['Jack', 'Jeff', 'James']);
  });

  it("inserts items correctly at the end", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.insertAt(4, o({name: 'Jeff', browser: 'firefox'}));
    expect(obj.get('groupedModel').findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['Jack', 'James', 'Jeff']);
  });

  // Removal

  it("removes item at the beginning of a group correctly", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.removeAt(0);
    expect(obj.get('groupedModel').findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['James']);
    expect(obj.get('groupedModel').findBy('value', 'chrome').get('items').mapBy('name')).to.deep.equal(['Jacob', 'Jeremy']);
  });

  it("removes item in the middle of a group correctly", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.insertAt(4, o({name: 'Jeff', browser: 'firefox'}));
    inputArray.removeAt(2);
    expect(obj.get('groupedModel').findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['Jack', 'Jeff']);
    expect(obj.get('groupedModel').findBy('value', 'chrome').get('items').mapBy('name')).to.deep.equal(['Jacob', 'Jeremy']);
  });

  it("removes item at the end of a group correctly", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.removeAt(2);
    expect(obj.get('groupedModel').findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['Jack']);
    expect(obj.get('groupedModel').findBy('value', 'chrome').get('items').mapBy('name')).to.deep.equal(['Jacob', 'Jeremy']);
  });

  it("removes group when removing the last item", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.clear();
    expect(obj.get('groupedModel').findBy('value', 'firefox')).to.equal(undefined);
    expect(obj.get('groupedModel').findBy('value', 'chrome')).to.equal(undefined);
  });

  // Changing

  it("changes an item's group correctly", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.get('firstObject').set('browser', 'chrome');
    expect(groups.findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['James']);
    expect(groups.findBy('value', 'chrome').get('items').mapBy('name')).to.deep.equal(['Jack', 'Jacob', 'Jeremy']);
  });

  // Duplicates

  it("removes first instance of duplicate correctly", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.pushObject(inputArray.objectAt(0));
    inputArray.removeAt(0);
    expect(groups.findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['James', 'Jack']);
  });

  it("removes last instance of duplicate correctly", function() {
    var inputArray = getInputArray();
    var obj = Obj.create({model: inputArray});
    var groups = obj.get('groupedModel');

    inputArray.pushObject(inputArray.objectAt(0));
    inputArray.removeAt(4);
    expect(groups.findBy('value', 'firefox').get('items').mapBy('name')).to.deep.equal(['Jack', 'James']);
  });

});