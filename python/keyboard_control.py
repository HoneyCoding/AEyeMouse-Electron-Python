from pickle import FALSE
from pynput import keyboard
from enum_types import Direction
import socketio
import keys

sio = socketio.Client(logger=False)
sio.connect('http://localhost:5000')

@sio.event
def connect():
    print('Client connection established')

@sio.event
def disconnect():
    print('disconnected from server')

# Keyboard
def pressed_key(key):
    return key.char

def on_press(key):
    keyboard_key = pressed_key(key)
    if keyboard_key == 'w':
        sio.emit(keys.MOVE_MOUSE, Direction.UP)
    elif keyboard_key == 'a':
        sio.emit(keys.MOVE_MOUSE, Direction.LEFT)
    elif keyboard_key == 's':
        sio.emit(keys.MOVE_MOUSE, Direction.DOWN)
    elif keyboard_key == 'd':
        sio.emit(keys.MOVE_MOUSE, Direction.RIGHT)
    elif keyboard_key == 'j':
        sio.emit(keys.PERFORM, {})
    print("Key {} pressed".format(key))


with keyboard.Listener(on_press=on_press) as listener:
    listener.join()
    
