install:
	pip install -r requirements.txt
save:
	pip freeze > requirements.txt
lint:
	pylint *.py
	pylint src/
run:
	python index.py
