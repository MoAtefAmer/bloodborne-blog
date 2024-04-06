.PHONY: run
args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-}`

run:; npm run dev

dockerImage:; docker build -t $(call args) .