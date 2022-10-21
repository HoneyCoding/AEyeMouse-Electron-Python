import time
import socketio
import keys
from functions import encodeString

sio = socketio.Client()
sio.connect('http://127.0.0.1:5000')

def move_position(*position):
    move_pos = encodeString(*position)
    sio.emit(keys.TELEPORT, move_pos)

if __name__ == '__main__':
    move_position(1550, 620)
    print("move_position")
    time.sleep(1.6)
    sio.emit(keys.BLINK, {})
    print("blink")
    time.sleep(1.6)
    move_position(1650, 60)
    print("move_position")
    time.sleep(1.6)
    sio.emit(keys.BLINK, {})
    print("blink")
