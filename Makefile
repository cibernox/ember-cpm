jshint_bin     = ./node_modules/jshint/bin/jshint
bower_bin      = ./node_modules/bower/bin/bower

bower_libs = bower_components/ember/ember.js bower_components/jquery/jquery.js bower_components/handlebars/handlebars.runtime.js
npm_libs   = $(jshint_bin) $(phantomjs_bin) $(bower_bin)
src_files = src/preamble.js src/index.js src/concat.js

test: ensure_phantomjs jshint $(bower_libs)
	testem ci -l phantomjs

ensure_phantomjs:
	@which phantomjs > /dev/null || (echo "Couldn't find phantomjs" && false)

install_dependencies: npm_install bower_install

index.js: $(src_files)
	cat $(src_files) > index.js

jshint: $(jshint_bin)
	@$(jshint_bin) index.js src/*.js spec/*Spec.js
	@echo "JSHint OK"

$(bower_libs): bower_install

bower_install:
	@$(bower_bin) install

$(npm_libs): npm_install

npm_install:
	@npm install

clobber:
	@rm -rf ./node_modules/
	@rm -rf ./bower_components/

.PHONY: ensure_phantomjs install_dependencies test jshint bower_install npm_install clobber
