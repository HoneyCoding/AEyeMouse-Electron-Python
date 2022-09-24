from pynput.mouse import Button, Controller
from pynput import keyboard
import eventlet
import socketio

mouse = Controller()

print(mouse.position)

UP = "UP"
DOWN = "DOWN"
LEFT = "LEFT"
RIGHT = "RIGHT"

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
        mouse.press(Button.left)
        mouse.release(Button.left)
    print("Key {} pressed".format(key))


with keyboard.Listener(
    on_press=on_press
) as listener:
    listener.join()
