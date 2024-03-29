"""
Attach a border to a GridLayout.
"""
from kivy.uix.gridlayout import GridLayout
from kivy.graphics import Line

from src.utils.constants import WINDOW_HEIGHT

class BorderedGridLayout(GridLayout):
    """
    Attach a border to a GridLayout.
    """
    border_lines = None
    border_offsets = []

    def __init__(self, border_offsets, **kwargs):
        super().__init__(**kwargs)
        self.border_offsets = border_offsets
        with self.canvas:
            self.border_lines = [Line() for _ in self.border_offsets]

    def on_size(self, *_args):
        """
        Update the border lines when the size changes.
        """
        self.update_border()

    def on_pos(self, *_args):
        """
        Update the border lines when the position changes.
        """
        self.update_border()

    def update_border(self):
        """
        Update the border lines.
        """
        # Calculate the position and points for the border line
        for idx, pos in enumerate(self.border_lines):
            # TODO: Fix this. figure out why self.height is 800 and not 400
            border_y = (WINDOW_HEIGHT * 2 ) - self.border_offsets[idx]
            pos.points = [self.x, border_y, self.x + self.width, border_y]
