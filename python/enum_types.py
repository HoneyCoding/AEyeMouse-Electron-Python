from enum import IntEnum

# Mode는 눈을 깜빡였을 때 마우스 좌클릭, 마우스 우클릭, 드래그, 스크롤, 커서 텔레포트가 되도록 하는 기능을 상징합니다.
# Mode.DOUBLE_CLICK과 같은 형태로 코드를 작성해 값을 사용할 수 있습니다.
# Mode.DOUBLE_CLICK.to_string()과 같이 메서드를 실행하면 "DOUBLE_CLICK"과 같은 str 타입이 return됩니다.

class Mode(IntEnum):
    LEFT_CLICK = 0
    DOUBLE_CLICK = 1
    RIGHT_CLICK = 2
    
    def to_string(self):
        if self == 1:
            return "DOUBLE_CLICK"
        elif self == 2:
            return "RIGHT_CLICK"
        return "LEFT_CLICK"

# Direction은 마우스 커서의 움직임에 대해 위,아래,좌,우를 상징합니다.
# Direction.UP / Direction.LEFT와 같은 형태로 코드를 작성해 값을 사용할 수 있습니다.
class Direction(IntEnum):
    UP = 1
    DOWN = 2
    LEFT = 3
    RIGHT = 4
