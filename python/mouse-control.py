from pynput.mouse import Button, Controller
from pynput import keyboard
import eventlet
import socketio

sio = socketio.Server()
app = socketio.WSGIApp(sio)

mouse = Controller()

# Mouse Control
def move_mouse(direction):
    cur_x, cur_y = mouse.position
    speed = 10
    if direction == UP:
        cur_y -= speed
    elif direction == DOWN:
        cur_y += speed
    elif direction == LEFT:
        cur_x -= speed
    elif direction == RIGHT:
        cur_x += speed
    mouse.position = (cur_x, cur_y)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on('get-data-python')
def msg(sid, data):
    print('message ', data)

    return "OK", "Test data from python"

@sio.on('click-left-mouse-python')
def msg(sid, data):
    mouse.press(Button.left)
    mouse.release(Button.left)
    return "OK", "Left Button Clicked from python"


@sio.on('click-right-mouse-python')
def msg(sid, data):
    mouse.press(Button.right)
    mouse.release(Button.right)
    return "OK", "Right Button Clicked from python"

@sio.on('drag-mouse-python')
def msg(sid, data):
    mouse.position = (10, 20)
    return "OK", "Dragged from python"

@sio.on('scroll-mouse-python')
def msg(sid, data):
    mouse.scroll(0, 2)
    return "OK", "Scrolled from python"

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)

# Keyboard
def pressed_key(key):
    return key.char

def on_press(key):
    keyboard_key = pressed_key(key)
    if keyboard_key == 'w':
        print("UP")
        move_mouse(UP)
    elif keyboard_key == 'a':
        move_mouse(LEFT)
    elif keyboard_key == 's':
        move_mouse(DOWN)
    elif keyboard_key == 'd':
        move_mouse(RIGHT)
    elif keyboard_key == 'j':
        move_mouse(UP)
    print("Key {} pressed".format(key))
