from kivy.config import Config

from src.utils.constants import WINDOW_HEIGHT, WINDOW_WIDTH

Config.set('graphics', 'width', WINDOW_WIDTH)
Config.set('graphics', 'height', WINDOW_HEIGHT)

from src.game import SnakeApp

if __name__ == '__main__':
    SnakeApp().run()
