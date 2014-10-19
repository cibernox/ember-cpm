var path        = require('path');
var fs          = require('fs');
var inflection  = require('inflection');
var EOL         = require('os').EOL;

module.exports = {
  description: 'Generates a computed property macro',
  // ember g macro to-string
  afterInstall: function (options) {
    var entity  = options.entity;

    if (!options.dryRun) {
      addMacroToNamespace(entity.name);
    }
  },

  // ember d macro to-string
  afterUninstall: function (options) {
    var entity  = options.entity;

    if (!options.dryRun) {
      removeMacroFromNamespace(entity.name, {
        type: options.type
      });
    }
  }
};

/**
 * Remove module import and namespace inclusion of a macro from addon/index.js
 */
function removeMacroFromNamespace (name) {
  var camelizedName = inflection.camelize(inflection.titleize(name).replace('-', ''), true);
  var namespacePath = path.join(process.cwd(), 'addon', 'index.js');
  var oldContent = fs.readFileSync(namespacePath, 'utf-8');
  var newContent = oldContent;
  newContent = newContent
    // Get rid of any matching import
    .replace(new RegExp("(import\\s*" + camelizedName + "\\s*from\\s*\\'.\/macros\/" + name + "\';)\n", "gm"), '')
    // Get rid of the namespace reference
    .replace(new RegExp("(var\\s*Macros\\s*=\\s*{[^}]+)(\\s*" + camelizedName + "\\s*:\\s*" + camelizedName  + ",\n\\s*)([^}]+};)", "gm"), '$1$3');
  fs.writeFileSync(namespacePath, newContent);
}

/**
 * Add a module import and namespace inclusion of a macro to addon/index.js
 */
function addMacroToNamespace (name) {
  var camelizedName = inflection.camelize(inflection.titleize(name).replace('-', ''), true);
  var namespacePath = path.join(process.cwd(), 'addon', 'index.js');
  var oldContent = fs.readFileSync(namespacePath, 'utf-8');
  var importExistence  = new RegExp("(?:import)\\s" + camelizedName + "\\sfrom\\s\\'\\.\\\/macros\\\/" + name + "\\';","gm");
  var attachmentExistence  = new RegExp("(?:var\\s*Macros\\s*\\=\\s*\\{)(?:\\s*[A-Za-z:,\\s]+\\s*)(" + camelizedName + ")\\:\\s*(" + camelizedName + "),(?:\\s*[A-Za-z\\:,\\s]+\\s*)\\};","gm");
  var newContent = oldContent;

//(import\s*[A-Za-z]+\s*from\s*\'[\w\/\.\-]+\'\;)
  if (!importExistence.test(oldContent)) {
    var importString = 'import ' + camelizedName + ' from \'./macros/' + name + '\';';
    console.log('  adding "' + importString + '" to addons/index.js');
    newContent = newContent.replace(/(import\s*[A-Za-z]+\s*from\s*\'[\w\/\.\-]+\'\;)(?![\s\S]*import)/,'$1' + EOL + importString);
  }

  // Add the macro to the namespace
  if (!attachmentExistence.test(oldContent)) {
    console.log('  adding mapping for EmberCPM.Macros.' + camelizedName + ' to global namespace');
    newContent = newContent.replace(/(var\s*Macros\s*=\s*\{)/, '$1' + EOL + '  ' + camelizedName + ': ' + camelizedName + ',');
  }
  fs.writeFileSync(namespacePath, newContent);
}
