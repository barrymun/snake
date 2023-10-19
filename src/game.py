"""
Main game class and entry point for the game.
"""
from random import randint
from kivy.clock import Clock
from kivy.graphics import Rectangle
from kivy.uix.widget import Widget

from src.utils.constants import WINDOW_HEIGHT, WINDOW_WIDTH

class SnakeGame(Widget):
    """
    Main game class.
    """
    snake_size = None
    snake_pos = None
    snake_rectangles = None
    direction = None
    food_pos = None
    food_rectangle = None
    paused = False
    
    def start_game(self):
        """
        Start the game.
        """
        self.snake_size = 20
        self.snake_pos = [[200, 200], [220, 200], [240, 200]]
        self.direction = 'left'
        self.food_pos = [randint(0, WINDOW_WIDTH), randint(0, WINDOW_HEIGHT)]
        with self.canvas:
            self.snake_rectangles = [
                Rectangle(pos=pos, size=(self.snake_size, self.snake_size))
                for pos in self.snake_pos
            ]
            self.food_rectangle = Rectangle(pos=self.food_pos, size=(self.snake_size, self.snake_size))
        Clock.schedule_interval(self.update, 0.15)
    
    def move_snake(self):
        """
        Move the snake.
        """
        if self.direction == 'left':
            new_head = [self.snake_pos[0][0] - self.snake_size, self.snake_pos[0][1]]
        elif self.direction == 'right':
            new_head = [self.snake_pos[0][0] + self.snake_size, self.snake_pos[0][1]]
        elif self.direction == 'up':
            new_head = [self.snake_pos[0][0], self.snake_pos[0][1] + self.snake_size]
        elif self.direction == 'down':
            new_head = [self.snake_pos[0][0], self.snake_pos[0][1] - self.snake_size]
        else:
            raise ValueError("Invalid direction")

        # wrap around screen
        new_head[0] = new_head[0] % self.width
        new_head[1] = new_head[1] % self.height

        return new_head

    def check_snake_collision(self):
        """
        Check for collision with snake.
        """
        head_pos = self.snake_pos[0]
        if head_pos in self.snake_pos[1:]:
            print("Game Over!")

    def check_food_collision(self, new_head):
        """
        Check for collision with food.
        """
        if (self.snake_pos[0][0] < self.food_pos[0] + self.snake_size and
            self.snake_pos[0][0] + self.snake_size > self.food_pos[0] and
            self.snake_pos[0][1] < self.food_pos[1] + self.snake_size and
            self.snake_pos[0][1] + self.snake_size > self.food_pos[1]):
            # Collision detected, update the snake and fruit positions accordingly

            # # Move the snake
            self.snake_pos = [new_head] + self.snake_pos[:-1]

            # Update the fruit's position
            self.food_pos[0] = randint(0, (self.width // self.snake_size) - 1) * self.snake_size
            self.food_pos[1] = randint(0, (self.height // self.snake_size) - 1) * self.snake_size

            # Add the new segment to the snake's position list
            last_segment_pos = self.snake_pos[-1]
            if self.direction == 'left':
                new_segment_pos = [last_segment_pos[0] + self.snake_size, last_segment_pos[1]]
            elif self.direction == 'right':
                new_segment_pos = [last_segment_pos[0] - self.snake_size, last_segment_pos[1]]
            elif self.direction == 'up':
                new_segment_pos = [last_segment_pos[0], last_segment_pos[1] - self.snake_size]
            elif self.direction == 'down':
                new_segment_pos = [last_segment_pos[0], last_segment_pos[1] + self.snake_size]
            self.snake_pos.append(new_segment_pos)
            self.snake_rectangles.append(Rectangle(pos=new_segment_pos, size=(self.snake_size, self.snake_size)))
        else:
            # If no collision, just move the snake
            self.snake_pos = [new_head] + self.snake_pos[:-1]

    def update(self, _dt):
        """
        Update the game state.
        """
        if self.paused:
            return
        
        new_head = self.move_snake()
        self.check_snake_collision()
        self.check_food_collision(new_head=new_head)

        # Clear the canvas
        self.canvas.clear()

        # Redraw the snake and the fruit
        with self.canvas:
            for pos in self.snake_pos:
                Rectangle(pos=pos, size=(self.snake_size, self.snake_size))
            Rectangle(pos=self.food_pos, size=(self.snake_size, self.snake_size))

    def on_key_down(self, _keyboard, keycode, _text, _modifiers):
        """
        Handle key presses.
        """
        if keycode[1] == 'left' and not self.direction == 'right':
            self.direction = 'left'
        elif keycode[1] == 'right' and not self.direction == 'left':
            self.direction = 'right'
        elif keycode[1] == 'up' and not self.direction == 'down':
            self.direction = 'up'
        elif keycode[1] == 'down' and not self.direction == 'up':
            self.direction = 'down'
        return True
