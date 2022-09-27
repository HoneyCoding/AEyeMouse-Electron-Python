from enum import IntEnum

class Mode(IntEnum):
    LEFT_CLICK = 1
    RIGHT_CLICK = 2
    DRAG = 3
    SCROLL = 4
    TELEPORT = 5
    
    def to_string(self):
        if self == 1:
            return "LEFT_CLICK"
        elif self == 2:
            return "RIGHT_CLICK"
        elif self == 3:
            return "DRAG"
        elif self == 4:
            return "SCROLL"
        elif self == 5:
            return "TELEPORT"


class Direction(IntEnum):
    UP = 1
    DOWN = 2
    LEFT = 3
    RIGHT = 4
