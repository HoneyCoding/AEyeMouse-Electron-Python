from pynput.mouse import Button, Controller
import eventlet
import socketio

from enum_types import Direction, Mode
from functions import decodeString
import keys

SERVER_IP = 'localhost'
SERVER_PORT = 5000
SIZE = 1024
SERVER_ADDR = (SERVER_IP, SERVER_PORT)

sio = socketio.Server()
app = socketio.WSGIApp(sio)

mouse = Controller()
mouse_mode = Mode.LEFT_CLICK

# Mouse Control
def move_mouse(direction):
    cur_x, cur_y = mouse.position
    speed = 10
    if direction == Direction.UP:
        cur_y -= speed
    elif direction == Direction.DOWN:
        cur_y += speed
    elif direction == Direction.LEFT:
        cur_x -= speed
    elif direction == Direction.RIGHT:
        cur_x += speed
    mouse.position = (cur_x, cur_y)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on(keys.CLICK_LEFT)
def msg(sid, data):
    print("Click Left")
    do_left_click()
    return "OK", "Left Click"

@sio.on(keys.SET_MODE_LEFT_CLICK)
def msg(sid, data):
    return set_mode(Mode.LEFT_CLICK)

@sio.on(keys.SET_MODE_RIGHT_CLICK)
def msg(sid, data):
    return set_mode(Mode.RIGHT_CLICK)


@sio.on(keys.SET_MODE_DRAG)
def msg(sid, data):
    return set_mode(Mode.DRAG)

@sio.on(keys.SET_MODE_SCROLL)
def msg(sid, data):
    return set_mode(Mode.SCROLL)


@sio.on(keys.SET_MODE_TELEPORT)
def msg(sid, data):
    return set_mode(Mode.TELEPORT)

@sio.on(keys.MOVE_MOUSE)
def msg(sid, data):
    direction = int(data)
    move_mouse(direction)
    return "OK", "Mouse Mode Changed To Scroll"

@sio.on(keys.TELEPORT)
def msg(sid, data):
    decoded_data = decodeString(data, int)
    position = (decoded_data[0], decoded_data[1])
    do_teleport(position)
    return "OK", "Mouse TELEPORT"

@sio.on(keys.BLINK)
def msg(sid, data):
    global mouse_mode
    if mouse_mode == Mode.LEFT_CLICK:
        do_left_click()
    elif mouse_mode == Mode.RIGHT_CLICK:
        do_right_click()
    elif mouse_mode == Mode.DRAG:
        do_drag()
    elif mouse_mode == Mode.SCROLL:
        do_scroll()
    elif mouse_mode == Mode.TELEPORT:
        do_teleport()

def do_left_click():
    mouse.press(Button.left)
    mouse.release(Button.left)

def do_right_click():
    mouse.press(Button.right)
    mouse.release(Button.right)

def do_drag():
    mouse.position = (10, 20)

def do_scroll():
    mouse.scroll(0, 2)
    
def do_teleport(position = (10, 20)):
    mouse.position = position
    
def set_mode(mode):
    global mouse_mode
    mouse_mode = mode
    print("set_mode")
    return "OK", f"Mouse Mode Changed To {mode.to_string()}"

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)
