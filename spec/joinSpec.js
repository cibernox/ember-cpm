describe('join', function() {
  var Obj = Ember.Object.extend({
    firstName: 'Jean-Luc',
    lastName:  'Picard',
    fullName:  EmberCPM.Macros.join('firstName', 'lastName', ' ')
  });

  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('join');
  });

  it('joins the dependent properties with the separator', function() {
    var obj = Obj.create();
    expect(obj.get('fullName')).to.equal('Jean-Luc Picard');
  });

  it('updates when dependent properties update', function() {
    var obj = Obj.create();
    obj.set('firstName', 'Locutus');
    obj.set('lastName', 'of Borg');
    expect(obj.get('fullName')).to.equal('Locutus of Borg');
  });
});
