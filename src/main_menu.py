"""
Main menu for the game.
"""
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button

class MainMenu(BoxLayout):
    """
    Main menu for the game.
    """
    snake_app = None
    orientation = 'vertical'
    start_button = None
    quit_button = None
    
    def __init__(self, snake_app, **kwargs):
        super().__init__(**kwargs)
        self.snake_app = snake_app
        self.orientation = 'vertical'
        
        self.start_button = Button(text='Start Game')
        # pylint: disable-next=no-member
        self.start_button.bind(on_release=self.start_game)
        
        self.quit_button = Button(text='Quit')
        # pylint: disable-next=no-member
        self.quit_button.bind(on_release=self.quit_game)
        
        self.add_widget(self.start_button)
        self.add_widget(self.quit_button)
    
    def start_game(self, _instance):
        """
        Start the game.
        """
        self.parent.remove_widget(self)
        self.snake_app.start(self)
        self.snake_app.game.start_game()
    
    def quit_game(self, _instance):
        """
        Quit the game.
        """
        App.get_running_app().stop()
