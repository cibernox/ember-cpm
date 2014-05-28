jshint_bin     = ./node_modules/jshint/bin/jshint
testem_bin     = ./node_modules/testem/testem.js
bower_bin      = ./node_modules/bower/bin/bower

build: jshint
	rm -rf dist && broccoli build dist

clean:
	rm -rf tmp/testem_build

test-ci: ensure_phantomjs clean jshint
	broccoli build tmp/testem_build
	@$(testem_bin) ci -l phantomjs

test: ensure_phantomjs clean jshint $(bower_libs)
	broccoli build tmp/testem_build
	@$(testem_bin)

install_dependencies:
	@npm install
	@bower install

ensure_phantomjs:
	@which phantomjs > /dev/null || (echo "Couldn't find phantomjs" && false)

jshint: $(jshint_bin)
	@jshint Brocfile.js src/*.js spec/*Spec.js
	@echo "JSHint OK"

pristine: clean
	@rm -rf ./node_modules/
	@rm -rf ./bower_components/

.PHONY: ensure_phantomjs install_dependencies test test-ci jshint clean pristine
