from pynput import keyboard
from enum_types import Direction
import socketio
import keys

# 해당 파일에는 키보드에서 키를 입력받은 이후에 처리하는 코드가 작성되어 있습니다.
# 작성된 코드는 키보드 입력을 통해 마우스 기능을 실행하는 방식으로 구현되어 있습니다.
# 마우스 컨트롤과 관련된 코드는 mouse_control.py 파일에 구현되어 있습니다.

# --- Socket 클라이언트 구현 ---
# Socket을 활용해 마우스 컨트롤과 관련된 기능을 Socket 서버에 요청합니다.
# 키보드 입력을 받을 때 기능을 수행하는 해당 코드는 Socket 통신의 클라이언트로 구현되어 있습니다.
sio = socketio.Client(logger=False)
sio.connect('http://localhost:5000')

@sio.event
def connect():
    print('Client connection established')

@sio.event
def disconnect():
    print('disconnected from server')

# --- 키보드 입력 시 기능 구현 ---
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