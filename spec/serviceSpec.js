describe('service', function () {

  var subject;

  beforeEach(function() {
    var container = new Ember.Container();
    container.register('service:log', 'the logging service', { instantiate: false });

    subject = Ember.Object.extend({
      container: container,
      log: EmberCPM.Macros.service('log')
    }).create();
  });

  it('asks the container to resolve the given service', function() {
    expect(subject.get('log')).to.equal('the logging service');
  });

});
