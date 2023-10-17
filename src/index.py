from kivy.app import App
from kivy.uix.widget import Widget
from kivy.graphics import Rectangle
from kivy.clock import Clock
from kivy.core.window import Window
from random import randint

class SnakeGame(Widget):
    def __init__(self, **kwargs):
        super(SnakeGame, self).__init__(**kwargs)
        self.snake_size = 20
        self.snake_pos = [[200, 200], [220, 200], [240, 200]]
        self.direction = 'left'
        self.food_pos = [randint(0, 480), randint(0, 480)]
        
        with self.canvas:
            self.snake_rectangles = [Rectangle(pos=pos, size=(self.snake_size, self.snake_size)) for pos in self.snake_pos]
            self.food_rectangle = Rectangle(pos=self.food_pos, size=(self.snake_size, self.snake_size))
        
        Clock.schedule_interval(self.update, 0.15)

    def update(self, dt):
        # Update snake position
        if self.direction == 'left':
            new_head = [self.snake_pos[0][0] - self.snake_size, self.snake_pos[0][1]]
        elif self.direction == 'right':
            new_head = [self.snake_pos[0][0] + self.snake_size, self.snake_pos[0][1]]
        elif self.direction == 'up':
            new_head = [self.snake_pos[0][0], self.snake_pos[0][1] + self.snake_size]
        elif self.direction == 'down':
            new_head = [self.snake_pos[0][0], self.snake_pos[0][1] - self.snake_size]
            
        self.snake_pos = [new_head] + self.snake_pos[:-1]
        
        # Check for collision with food
        if self.snake_pos[0] == self.food_pos:
            self.snake_pos.append(self.snake_pos[-1])
            self.food_pos = [randint(0, 480), randint(0, 480)]
            self.snake_rectangles.append(Rectangle(pos=self.snake_pos[-1], size=(self.snake_size, self.snake_size)))

        # Update graphics
        for idx, rect in enumerate(self.snake_rectangles):
            rect.pos = self.snake_pos[idx]
        self.food_rectangle.pos = self.food_pos

    def on_key_down(self, keyboard, keycode, text, modifiers):
        if keycode[1] == 'left' and not self.direction == 'right':
            self.direction = 'left'
        elif keycode[1] == 'right' and not self.direction == 'left':
            self.direction = 'right'
        elif keycode[1] == 'up' and not self.direction == 'down':
            self.direction = 'up'
        elif keycode[1] == 'down' and not self.direction == 'up':
            self.direction = 'down'
        return True

class SnakeApp(App):
    def build(self):
        game = SnakeGame()
        self._keyboard = Window.request_keyboard(self._keyboard_closed, game)
        self._keyboard.bind(on_key_down=game.on_key_down)
        return game

    def _keyboard_closed(self):
        self._keyboard.unbind(on_key_down=self._on_keyboard_down)
        self._keyboard = None

if __name__ == '__main__':
    SnakeApp().run()
