install:
	pip install -r requirements.txt
save:
	pip freeze > requirements.txt
run:
	python index.py
