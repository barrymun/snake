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
    game = None
    orientation = 'vertical'
    start_button = None
    quit_button = None
    
    def __init__(self, game, **kwargs):
        super().__init__(**kwargs)
        self.game = game
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
        self.game.start_game()
        self.parent.remove_widget(self)
    
    def quit_game(self, _instance):
        """
        Quit the game.
        """
        App.get_running_app().stop()
