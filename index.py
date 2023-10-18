"""
Main entry point for the game.
"""
from kivy.config import Config

from src.utils.constants import WINDOW_HEIGHT, WINDOW_WIDTH

# set these here before other kivy imports
Config.set('graphics', 'width', WINDOW_WIDTH)
Config.set('graphics', 'height', WINDOW_HEIGHT)

# pylint: disable-next=wrong-import-position
from src.game import SnakeApp

if __name__ == '__main__':
    SnakeApp().run()
