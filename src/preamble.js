(function(window, Ember, $) {

  function reverseMerge(dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
  }

  var EmberCPM = {
        Macros: {},
        install: function() {
          reverseMerge(Ember.computed, EmberCPM.Macros);
        }
      };

  window.EmberCPM = EmberCPM;
  EmberCPM.VERSION = '1.0.1';
  if (Ember.libraries) Ember.libraries.register('Ember-CPM', EmberCPM.VERSION);

}).call(undefined, this, this.Ember, this.jQuery);
