module.exports = function(revision, tag, date){
  var names = ['ember-cpm-latest.js', 'ember-cpm-' + revision + '.js'];
  if (tag) {
    names.push('ember-cpm-' + tag + '.js')
  }
  return {
    'named-amd/ember-cpm.js': {
      contentType: 'text/javascript',
      destinations: {
        canary: names.map(function(name) { return 'named-amd/' + name })
      }
    },

    'globals/ember-cpm.js': {
      contentType: 'text/javascript',
      destinations: {
        canary: names.map(function(name) { return 'globals/' + name })
      }
    }
  };
};
