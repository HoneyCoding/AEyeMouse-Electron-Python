from enum import IntEnum

class Mode(IntEnum):
    LEFT_CLICK = 1
    RIGHT_CLICK = 2
    DRAG = 3
    SCROLL = 4


class Direction(IntEnum):
    UP = 1
    DOWN = 2
    LEFT = 3
    RIGHT = 4
    
    def to_string(self):
        if self == 1:
            return "UP"
        elif self == 2:
            return "DOWN"
        elif self == 3:
            return "LEFT"
        elif self == 4:
            return "RIGHT"
