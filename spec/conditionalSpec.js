var gt = Ember.computed.gt,
	gte = Ember.computed.gte,
	lt = Ember.computed.lt,
	lte = Ember.computed.lte,
	and = Ember.computed.and,
	any = Ember.computed.any,
	equal = Ember.computed.equal,
	empty = Ember.computed.empty,
	conditional = EmberCPM.Macros.conditional;



describe('conditional', function() {

	it('exists', function() {

		expect(EmberCPM.Macros).to.have.property('conditional');
	});

	it('handles a boolean conditional properly', function() {
		var MyType = Ember.Object.extend({
			a: true,
			b: conditional('a', 'yes', 'no')
		});

		var myObj = MyType.create();

		expect(myObj.get('b')).to.equal('yes');
		myObj.set('a', false);
		expect(myObj.get('b')).to.equal('no');
	});

	function simpleComputedPropertyMacroTest(name, fn, tests) {
		it('handles composed "%@" computed proerty'.fmt(name), function () {
			var MyType = Ember.Object.extend({
				a: -1,
				mac: conditional(fn('a', 15), 'yes', 'no')
			});

			var myObj = MyType.create();

			for (var i = 0; i < tests.length; i += 1) {
				myObj.set('a', tests[i].value);
				expect(myObj.get('mac')).to.equal(tests[i].testResult);
			}
		});
	}

	simpleComputedPropertyMacroTest('equal', equal, [
		{value: 12, testResult: 'no'},
		{value: 15, testResult: 'yes'},
		{value: 13, testResult: 'no'}
	]);
	simpleComputedPropertyMacroTest('lt', lt, [
		{value: 12, testResult: 'yes'},
		{value: 16, testResult: 'no'},
		{value: 15, testResult: 'no'},
		{value: 13, testResult: 'yes'}
	]);
	simpleComputedPropertyMacroTest('lte', lte, [
		{value: 12, testResult: 'yes'},
		{value: 16, testResult: 'no'},
		{value: 15, testResult: 'yes'},
		{value: 13, testResult: 'yes'}
	]);
	simpleComputedPropertyMacroTest('gt', gt, [
		{value: 12, testResult: 'no'},
		{value: 16, testResult: 'yes'},
		{value: 15, testResult: 'no'},
		{value: 13, testResult: 'no'}
	]);
	simpleComputedPropertyMacroTest('gte', gte, [
		{value: 12, testResult: 'no'},
		{value: 16, testResult: 'yes'},
		{value: 15, testResult: 'yes'},
		{value: 13, testResult: 'no'}
	]);

	it('handles "and" composable computed property macro', function () {
		var MyType = Ember.Object.extend({
			hasTent: true,
			hasBackpack: false,
			readyForCampString: conditional(and('hasTent', 'hasBackpack'), 'ready', 'not ready')
		});

		var myObj = MyType.create();
		expect(myObj.get('readyForCampString')).to.equal('not ready');
		myObj.set('hasBackpack', true);
		expect(myObj.get('readyForCampString')).to.equal('ready');
		myObj.set('hasTent', false);
		expect(myObj.get('readyForCampString')).to.equal('not ready');
	});

	it('handles "any" composable computed property macro', function () {
		var MyType = Ember.Object.extend({
			hasTent: false,
			hasBackpack: false,
			readyForCampString: conditional(any('hasTent', 'hasBackpack'), 'started getting ready', 'did not start yet')
		});

		var myObj = MyType.create();
		expect(myObj.get('readyForCampString')).to.equal('did not start yet');
		myObj.set('hasBackpack', true);
		expect(myObj.get('readyForCampString')).to.equal('started getting ready');
		myObj.set('hasBackpack', false);
		expect(myObj.get('readyForCampString')).to.equal('did not start yet');
		myObj.setProperties({hasBackpack: true, hasTesnt: true});
		expect(myObj.get('readyForCampString')).to.equal('started getting ready');
	});

	it('handles "empty" composable computed property macro', function () {
		var MyType = Ember.Object.extend({
			attendees: ['Charlie', 'Dennis', 'Mac'],
			paddysPubStatus: conditional(empty('attendees'), 'closed', 'open')
		});

		var myObj = MyType.create();
		expect(myObj.get('paddysPubStatus')).to.equal('open');
		myObj.get('attendees').clear();
		expect(myObj.get('paddysPubStatus')).to.equal('closed');
		myObj.get('attendees').addObject('frank');
		expect(myObj.get('paddysPubStatus')).to.equal('open');
	});

	it('handles nested conditional computed properties', function () {
		var MyType = Ember.Object.extend({
			a: 14,
			b: conditional(conditional(equal('a', 15), 'yes', null), 'good', 'bad')
		});

		var myObj = MyType.create();
		expect(myObj.get('b')).to.equal('bad');
		myObj.set('a', 15);
		expect(myObj.get('b')).to.equal('good');
		myObj.set('a', 16);
		expect(myObj.get('b')).to.equal('bad');
	});
});
