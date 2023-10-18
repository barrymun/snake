"""
Main entry point for the game.
"""
from kivy.app import App
from kivy.core.window import Window
from kivy.uix.boxlayout import BoxLayout

from src.main_menu import MainMenu
from src.game import SnakeGame

class SnakeApp(App):
    """
    Main entry point for the game.
    """
    game = None
    menu = None
    root = None
    _keyboard = None
    
    def build(self):
        self.game = SnakeGame()
        self.menu = MainMenu(self.game)

        self.root = BoxLayout()
        self.root.add_widget(self.menu)
        self.root.add_widget(self.game)
        
        self._keyboard = Window.request_keyboard(self._keyboard_closed, self.game)
        self._keyboard.bind(on_key_down=self.game.on_key_down)
        return self.root

    def _keyboard_closed(self):
        self._keyboard.unbind(on_key_down=self._on_keyboard_down)
        self._keyboard = None
