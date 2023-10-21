# Snake Game 🐍

A classic game implemented in Python. Guide the snake to eat food and grow as long as possible without running into the walls or itself.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Game](#running-the-game)
- [Development](#development)
  - [Linting](#linting)
  - [Cleaning Up](#cleaning-up)
- [Building the App](#building-the-app)
  - [Development Build](#development-build)
  - [Production Build](#production-build)
- [Running the App](#running-the-app)
- [License](#license)

## Getting Started

These instructions will get you a copy of the game up and running on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.x
- pip (Python package installer)
- virtual environment

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/snake-game.git
cd snake-game
```

Ensure to create a virtual environment, and then install the required packages:

```bash
make install
```

## Running the Game

To play the game, run:

```bash
python index.py
```

## Development

### Linting

Check the code quality and style by running:

```bash
make lint
```

### Cleaning Up

Clean build artifacts and temporary files with:

```bash
make clean
```

## Building the App

To build a standalone application, you need `py2app`. Install it using pip:

```bash
pip3 install -U py2app
```

## Development Build

For a quicker development build, run:

```bash
make build-alias
```

## Production Build

For a production-ready build, run:

```bash
make build-prod
```

## Running the App

After building, you can run the app directly from the terminal:

```bash
make run-terminal
```

Or open it as a normal Mac application:

```bash
make run-app
```

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.
