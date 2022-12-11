import platform
import pyautogui
import socketio
import eventlet
import keys

from enum_types import Direction, Mode
from functions import decodeString

SERVER_IP = 'localhost'
SERVER_PORT = 5000
SIZE = 1024
SERVER_ADDR = (SERVER_IP, SERVER_PORT)

sio = socketio.Server()
app = socketio.WSGIApp(sio)

mouse_mode = Mode.LEFT_CLICK

# Normal Functions
def set_mode(mode):
    global mouse_mode
    mouse_mode = mode
    print(f"Set Mode to {mode.to_string()}")
    return "OK", f"Mouse Mode Changed To {mode.to_string()}"

def double_click():
    pyautogui.click(clicks=2)
    
def right_click():
    pyautogui.rightClick()
    
def left_click():
    pyautogui.click()
    
def drag_mouse(from_x, from_y, to_x, to_y):
    pyautogui.moveTo(from_x, from_y)
    pyautogui.dragTo(to_x, to_y, 0.3, button='left')

def scroll_mouse(direction, speed = 10):
    scroll_value = 0
    if direction == Direction.UP:
        scroll_value = speed
    elif direction == Direction.DOWN:
        scroll_value = -speed

    pyautogui.scroll(scroll_value)
    
def move_mouse(direction: Direction):
    cur_x, cur_y = pyautogui.position()
    speed = 10
    if direction == Direction.UP:
        cur_y -= speed
    elif direction == Direction.DOWN:
        cur_y += speed
    elif direction == Direction.LEFT:
        cur_x -= speed
    elif direction == Direction.RIGHT:
        cur_x += speed
    pyautogui.moveTo(cur_x, cur_y)

# Socket Functions
@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@sio.on(keys.DRAG_MOUSE)
def msg(sid, data):
    from_x, from_y, to_x, to_y = decodeString(data, int)
    drag_mouse(from_x, from_y, to_x, to_y)
    return "OK", keys.DRAG_MOUSE

@sio.on(keys.SCROLL_MOUSE)
def msg(sid, data):
    direction = data
    
    if platform.system().lower() == "darwin":
        speed = 20
    else:
        speed = 80
    
    
    if direction == "UP":
        scroll_mouse(Direction.UP, speed)
    elif direction == "DOWN":
        scroll_mouse(Direction.DOWN, speed)

    return "OK", keys.SCROLL_MOUSE

@sio.on(keys.SET_MODE_DOUBLE_CLICK)
def msg(sig, data):
    set_mode(Mode.DOUBLE_CLICK)
    return "OK", keys.SET_MODE_DOUBLE_CLICK


@sio.on(keys.SET_MODE_RIGHT_CLICK)
def msg(sig, data):
    set_mode(Mode.RIGHT_CLICK)
    return "OK", keys.SET_MODE_RIGHT_CLICK

@sio.on(keys.MOVE_MOUSE)
def msg(sid, data):
    direction = int(data)
    move_mouse(direction)
    return "OK", "Mouse Mode Changed To Scroll"

@sio.on(keys.BLINK)
def msg(sid, data):
    global mouse_mode
    if mouse_mode == Mode.DOUBLE_CLICK:
        double_click()
        set_mode(Mode.LEFT_CLICK)
    elif mouse_mode == Mode.RIGHT_CLICK:
        right_click()
        set_mode(Mode.LEFT_CLICK)
    else:
        left_click()

# @sio.on(keys.DOUBLE_CLICK)
# def msg(sid, data):
#     pyautogui.click(clicks=2)
#     return "OK", keys.DOUBLE_CLICK

# @sio.on(keys.RIGHT_CLICK)
# def msg(sid, data):
#     pyautogui.rightClick()
#     return "OK", keys.RIGHT_CLICK

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)
