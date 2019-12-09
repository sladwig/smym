


.PHONY: start
start: node-modules
	yarn start

.PHONY: test
test: node-modules
	yarn test


.PHONY: node-modules
node-modules: .make.node-modules
.make.node-modules: package.json
	yarn install
	touch $@