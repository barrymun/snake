"""
Main entry point for the game.
"""
from kivy.app import App
from kivy.core.window import Window

from src.game import SnakeGame

class SnakeApp(App):
    """
    Main entry point for the game.
    """
    _keyboard = None
    
    def build(self):
        game = SnakeGame()
        self._keyboard = Window.request_keyboard(self._keyboard_closed, game)
        self._keyboard.bind(on_key_down=game.on_key_down)
        return game

    def _keyboard_closed(self):
        self._keyboard.unbind(on_key_down=self._on_keyboard_down)
        self._keyboard = None
