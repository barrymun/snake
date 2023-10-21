install:
	pip install -r requirements.txt
save:
	pip freeze > requirements.txt
lint:
	pylint *.py
	pylint src/
run:
	python index.py
clean:
	rm -rf build dist
build-alias:
	python setup.py py2app -A
build-prod:
	python setup.py py2app
run-terminal:
	./dist/index.app/Contents/MacOS/index
run-app:
	open dist/index.app
