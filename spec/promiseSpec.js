describe('promise', function () {

  var object, promise;

  beforeEach(function() {
    object = Ember.Object.extend({
      asPromise: EmberCPM.Macros.promise('value')
    }).create({
      value: 'Kangaroo'
    });
    promise = object.get('asPromise');
  });

  it('returns a promise', function() {
    expect(typeof(promise.then)).to.equal('function');
  });

  it('is pre-resolved', function() {
    var state;
    promise.then(
      function() { state = 'passed'; },
      function() { state = 'failed'; }
    );
    expect(state).to.equal('passed');
  });

  it('resolves with the value', function() {
    var resolvedWith;
    promise.then(
      function(x) { resolvedWith = x; },
      function(x) { resolvedWith = x; }
    );
    expect(resolvedWith).to.equal('Kangaroo');
  });

});
