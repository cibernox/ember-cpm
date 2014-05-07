jshint_bin     = ./node_modules/jshint/bin/jshint
testem_bin     = ./node_modules/testem/testem.js
bower_bin      = ./node_modules/bower/bin/bower

build: jshint
	rm -rf dist && broccoli build dist

test-ci: ensure_phantomjs jshint
	@$(testem_bin) ci -l phantomjs

test: ensure_phantomjs jshint $(bower_libs)
	@$(testem_bin)

install_dependencies:
	@npm install
	@bower install

ensure_phantomjs:
	@which phantomjs > /dev/null || (echo "Couldn't find phantomjs" && false)

jshint: $(jshint_bin)
	@jshint Brocfile.js src/*.js spec/*Spec.js
	@echo "JSHint OK"

.PHONY: ensure_phantomjs install_dependencies test test-ci jshint
