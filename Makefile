NAME="Woterbuch"
VERSION="v0.1.0"
BUILDDIR ?= tmp

.PHONY: install install-verb-conjugation install-translation clean

version:
	@echo "$(NAME): $(VERSION)"

install: install-verb-conjugation install-translation 

# Verb Conjugation Utility
# https://github.com/nicksellen/german
install-verb-conjugation:
	npm install -g german
	$(call echo_installed,Installed Verb Conjugation Cmd Tool)

# Translation Utility
# https://github.com/soimort/translate-shell
install-translation:
	git clone https://github.com/soimort/translate-shell.git $(BUILDDIR)/translate-shell/
	-make -C $(BUILDDIR)/translate-shell install
	make clean
	$(call echo_installed,Installed Translation Cmd Tool)

clean:
	rm -rf $(BUILDDIR)/

linux: ECHO $(TARGET)
	ar r $(TARGET) $(OBJECTS)
	@echo
	@echo "   " \
	ranlib $(TARGET)
	@echo

define echo_installed
	@echo "***** $(1) *****\n"
endef