describe('boundFilter', function () {
  var get = Ember.get,
    set = Ember.set;

  var Cruise, cruise, people;

  beforeEach(function () {
    people = [
      {name: 'Cris', age: 24},
      {name: 'Jane', age: 17},
      {name: 'Paul', age: 18},
      {name: 'Robb', age: 23},
      {name: 'Mark', age: 19},
      {name: 'Anne', age: 21},
      {name: 'Mike', age: 15},
      {name: 'John', age: 16},
      {name: 'Kate', age: 20},
      {name: 'Bert', age: 22},
    ];
  });


  describe('when subscribed to the array itself', function(){
    beforeEach(function () {
      Cruise = Ember.Object.extend({
        people: [],
        minAgeToDrink: 21,
        drinkingPeople: EmberCPM.Macros.boundFilter('people', 'minAgeToDrink', function(person){
          return get(person, 'age') >= get(this, 'minAgeToDrink');
        })
      });
      cruise = Cruise.create({people: people});
      cruise.get('drinkingPeople'); // Access the property at least once.
    });

    it('return the people that satisfy the filter condition preserving the original order', function(){
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Robb', 'Anne', 'Bert']);
    });

    it('remains updated when people is added', function(){
      var people = cruise.get('people');
      Ember.run(function(){
        people.insertAt(0, {name: 'Jake', age: 30});
        people.pushObject({name: 'Gina', age: 25});
      });
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Jake', 'Cris', 'Robb', 'Anne', 'Bert', 'Gina']);
    });

    it('remains updated when people is removed', function(){
      var people = cruise.get('people');
      Ember.run(function(){
        people.removeAt(9);
        people.removeAt(4);
        people.removeAt(3);
      });
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Anne']);
    });

    it('remains updated when the min. age to drink changes', function(){
      Ember.run(cruise, 'set', 'minAgeToDrink', 18);
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Paul', 'Robb', 'Mark', 'Anne', 'Kate', 'Bert']);

      Ember.run(cruise, 'set', 'minAgeToDrink', 20);
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Robb', 'Anne', 'Kate', 'Bert']);
    });

    it('listen to changes in as many dependent properties as needed', function(){
      var Boat, boat;
      Boat = Ember.Object.extend({
        people: [],
        minAgeToDrink: 21,
        minAgeToVote: 18,
        votingButNotDrinkingPeople: EmberCPM.Macros.boundFilter('people', 'minAgeToVote', 'minAgeToDrink', function(person){
          var age = get(person, 'age');
          return age >= get(this, 'minAgeToVote') && age < get(this, 'minAgeToDrink');
        })
      });
      boat = Boat.create({people: people});
      expect(boat.get('votingButNotDrinkingPeople').mapBy('name')).to.eql(['Paul', 'Mark', 'Kate']);

      Ember.run(boat, 'setProperties', {minAgeToDrink: 20, minAgeToVote: 16});
      expect(boat.get('votingButNotDrinkingPeople').mapBy('name')).to.eql(['Jane', 'Paul', 'Mark', 'John']);
    });

    it('DOES NOT remain updated when the elements receives changes in its properties', function(){
      var kate = cruise.get('people').objectAt(8);
      Ember.run(function(){ set(kate, 'age', 21); });
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Robb', 'Anne', 'Bert']);
    });
  });

  describe('when subscribed to a particular property in the elements of the array', function(){
    beforeEach(function () {
      Cruise = Ember.Object.extend({
        people: [],
        minAgeToDrink: 21,
        drinkingPeople: EmberCPM.Macros.boundFilter('people.@each.age', 'minAgeToDrink', function(person){
          return get(person, 'age') >= get(this, 'minAgeToDrink');
        })
      });
      cruise = Cruise.create({people: people});
      cruise.get('drinkingPeople'); // Access the property at least once.
    });

    it('return the people that satisfy the filter condition preserving the original order', function(){
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Robb', 'Anne', 'Bert']);
    });

    it('remains updated when people is added', function(){
      var people = cruise.get('people');
      Ember.run(function(){
        people.insertAt(0, {name: 'Jake', age: 30});
        people.pushObject({name: 'Gina', age: 25});
      });
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Jake', 'Cris', 'Robb', 'Anne', 'Bert', 'Gina']);
    });

    it('remains updated when people is removed', function(){
      var people = cruise.get('people');
      Ember.run(function(){
        people.removeAt(9);
        people.removeAt(4);
        people.removeAt(3);
      });
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Anne']);
    });

    it('remains updated when the min. age to drink changes', function(){
      Ember.run(cruise, 'set', 'minAgeToDrink', 18);
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Paul', 'Robb', 'Mark', 'Anne', 'Kate', 'Bert']);

      Ember.run(cruise, 'set', 'minAgeToDrink', 20);
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Robb', 'Anne', 'Kate', 'Bert']);
    });

    it('listen to changes in as many dependent properties as needed', function(){
      var Boat, boat;
      Boat = Ember.Object.extend({
        people: [],
        minAgeToDrink: 21,
        minAgeToVote: 18,
        votingButNotDrinkingPeople: EmberCPM.Macros.boundFilter('people.@each.age', 'minAgeToVote', 'minAgeToDrink', function(person){
          var age = get(person, 'age');
          return age >= get(this, 'minAgeToVote') && age < get(this, 'minAgeToDrink');
        })
      });
      boat = Boat.create({people: people});
      expect(boat.get('votingButNotDrinkingPeople').mapBy('name')).to.eql(['Paul', 'Mark', 'Kate']);

      Ember.run(boat, 'setProperties', {minAgeToDrink: 20, minAgeToVote: 16});
      expect(boat.get('votingButNotDrinkingPeople').mapBy('name')).to.eql(['Jane', 'Paul', 'Mark', 'John']);
    });

    it('remains updated when any element receives changes in that property', function(){
      var kate = cruise.get('people').objectAt(8);
      Ember.run(function(){ set(kate, 'age', 21); });
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Robb', 'Anne', 'Kate', 'Bert']);
      Ember.run(function(){ set(kate, 'age', 20); });
      expect(cruise.get('drinkingPeople').mapBy('name')).to.eql(['Cris', 'Robb', 'Anne', 'Bert']);
    });
  });
});
