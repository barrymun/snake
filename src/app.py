"""
Main entry point for the game.
"""
from kivy.app import App
from kivy.core.window import Window
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button

from src.main_menu import MainMenu
from src.game import SnakeGame
from src.widgets.bordered_grid_layout import BorderedGridLayout

class SnakeApp(App):
    """
    Main entry point for the game.
    """
    game = None
    menu = None
    root_layout = None
    game_layout = None
    pause_button = None
    _keyboard = None
    is_game_over = False
    
    def build(self):
        self.menu = MainMenu(self)

        self.root_layout = BoxLayout()
        self.root_layout.add_widget(self.menu)

        self.pause_button = Button(text='Pause', size_hint=(None, None), size=(120, 60))
        self.pause_button.bind(on_release=self.toggle_pause)

        self.game_layout = BorderedGridLayout(border_offsets=[60], rows=2, cols=1)
        
        return self.root_layout
    
    def setup_widgets(self, _instance):
        self.game_layout.add_widget(self.pause_button)
        self.game = SnakeGame(self)
        self._keyboard = Window.request_keyboard(self._keyboard_closed, self.game)
        self._keyboard.bind(on_key_down=self.game.on_key_down)
        self.game_layout.add_widget(self.game)
        self.root_layout.add_widget(self.game_layout)
        self.is_game_over = False
    
    def game_over(self, _instance):
        # don't allow game to be over twice
        if self.is_game_over:
            return
        self.is_game_over = True
        
        self.game_layout.remove_widget(self.pause_button)
        self.game_layout.remove_widget(self.game)
        self.root_layout.remove_widget(self.game_layout)
        self.menu = MainMenu(self)
        self.root_layout.add_widget(self.menu)
    
    def toggle_pause(self, _instance):
        self.game.paused = not self.game.paused
        self.pause_button.text = 'Resume' if self.game.paused else 'Pause'

    def _keyboard_closed(self):
        self._keyboard.unbind(on_key_down=self.game.on_key_down)
        self._keyboard = None
