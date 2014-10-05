describe('ifThenElse', function() {

	it('exists', function() {

		expect(EmberCPM.Macros).to.have.property('ifThenElse');
	});

	it('handles a boolean conditional properly', function() {
		var MyType = Ember.Object.extend({
			a: true,
			b: EmberCPM.Macros.ifThenElse('a', null, null, 'yes', 'no')
		});

		var myObj = MyType.create();

		expect(myObj.get('b')).to.equal('yes');
		myObj.set('a', false);
		expect(myObj.get('b')).to.equal('no');

	});

	it('handles a numeric prop compared to a numeric constant', function () {
		var MyType = Ember.Object.extend({
			a: 5,
			agt5: EmberCPM.Macros.ifThenElse('a', '>', 5, 'yes', 'no'),
			agte5: EmberCPM.Macros.ifThenElse('a', '>=', 5, 'yes', 'no'),
			alt5: EmberCPM.Macros.ifThenElse('a', '<', 5, 'yes', 'no'),
			alte5: EmberCPM.Macros.ifThenElse('a', '<=', 5, 'yes', 'no'),
			eqeq5: EmberCPM.Macros.ifThenElse('a', '==', 5, 'yes', 'no'),
			eqeqs5: EmberCPM.Macros.ifThenElse('a', '==', '5', 'yes', 'no'),
			eqeqeq5: EmberCPM.Macros.ifThenElse('a', '===', 5, 'yes', 'no'),
			eqeqeqs5: EmberCPM.Macros.ifThenElse('a', '===', '5', 'yes', 'no'),
		});

		var myObj = MyType.create();

		expect(myObj.get('agt5')).to.equal('no');
		expect(myObj.get('agte5')).to.equal('yes');

		expect(myObj.get('alt5')).to.equal('no');
		expect(myObj.get('alte5')).to.equal('yes');

		expect(myObj.get('eqeq5')).to.equal('yes');
		expect(myObj.get('eqeqs5')).to.equal('yes');
		expect(myObj.get('eqeqeq5')).to.equal('yes');
		expect(myObj.get('eqeqeqs5')).to.equal('no');

		myObj.set('a', 7);

		expect(myObj.get('agt5')).to.equal('yes');
		expect(myObj.get('agte5')).to.equal('yes');
		expect(myObj.get('alt5'), 'no');
		expect(myObj.get('alte5'), 'no');

		expect(myObj.get('eqeq5')).to.equal('no');
		expect(myObj.get('eqeqs5')).to.equal('no');
		expect(myObj.get('eqeqeq5')).to.equal('no');
		expect(myObj.get('eqeqeqs5')).to.equal('no');
	});

	it('handles a numeric property compared to another numeric property', function () {
		var MyType = Ember.Object.extend({
			a: 5,
			b: 7,
			agtb: EmberCPM.Macros.ifThenElse('a', '>', 'b', 'yes', 'no').property('a', 'b'),
			altb: EmberCPM.Macros.ifThenElse('a', '<', 'b', 'yes', 'no').property('a', 'b'),
		});

		var myObj = MyType.create();

		expect(myObj.get('agtb')).to.equal('no');
		expect(myObj.get('altb')).to.equal('yes');

		myObj.set('a', 8);

		expect(myObj.get('agtb')).to.equal('yes');
		expect(myObj.get('altb')).to.equal('no');

		myObj.set('b', 9);

		expect(myObj.get('agtb')).to.equal('no');
		expect(myObj.get('altb')).to.equal('yes');
	});

	it('handles string property compared to another string property', function () {
		var MyType = Ember.Object.extend({
			a: 'mike',
			b: 'mike',
			aeqeqb: EmberCPM.Macros.ifThenElse('a', '==', 'b', 'yes', 'no').property('a', 'b')
		});

		var myObj = MyType.create();

		expect(myObj.get('aeqeqb')).to.equal('yes');

		myObj.set('a', 'ember');

		expect(myObj.get('aeqeqb')).to.equal('no');
		myObj.set('b', 'ember');

		expect(myObj.get('aeqeqb')).to.equal('yes');
	});

	it('handles boolean propes compared with boolean operators', function () {
		var MyType = Ember.Object.extend({
			a: false,
			b: true,
			aorb: EmberCPM.Macros.ifThenElse('a', '||', 'b', 'yes', 'no').property('a', 'b'),
			aandb: EmberCPM.Macros.ifThenElse('a', '&&', 'b', 'yes', 'no').property('a', 'b')
		});

		var myObj = MyType.create();

		expect(myObj.get('aorb')).to.equal('yes');
		expect(myObj.get('aandb')).to.equal('no');

		myObj.set('b', false);

		expect(myObj.get('aorb')).to.equal('no');
		expect(myObj.get('aandb')).to.equal('no');

		myObj.setProperties({
			a: true,
			b: true
		});

		expect(myObj.get('aorb')).to.equal('yes');
		expect(myObj.get('aandb')).to.equal('yes');
	});

});
