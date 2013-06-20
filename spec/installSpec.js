describe('EmberCPM.install', function() {

  function expectMacroCopied(key) {
    expect(Ember.computed[key]).not.to.equal(undefined);
    expect(Ember.computed[key]).to.equal(EmberCPM.Macros[key]);
  }

  it('adds the extra computed property macros to Ember.computed', function() {
    EmberCPM.install();
    expectMacroCopied('encodeURIComponent');
    expectMacroCopied('notMatch');
    expectMacroCopied('safeString');
  });

});
