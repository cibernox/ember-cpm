describe('firstOf', function() {
  var Obj = Ember.Object.extend({
    nickname: '',
    name: 'Jean-Luc',
    email: 'jean@starship-enterprise.space',
    displayName: EmberCPM.Macros.firstOf('nickname', 'name', 'email')
  });

  it('exists', function() {
    expect(EmberCPM.Macros).to.have.property('firstOf');
  });

  it('returns the first value that is not empty', function() {
    var obj = Obj.create();
    expect(obj.get('displayName')).to.equal('Jean-Luc');
  });

  it('returns undefined if all values are empty', function() {
    var obj = Obj.create({ name: '', email: '' });
    var _undefined = ({})._; // because jshint does not like chai's .to.be.undefined;
    expect(obj.get('displayName')).to.equal(_undefined);
  });
});
