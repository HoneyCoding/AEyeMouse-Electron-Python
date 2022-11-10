import pyautogui
import socketio
import eventlet

from functions import decodeString

SERVER_IP = 'localhost'
SERVER_PORT = 5000
SIZE = 1024
SERVER_ADDR = (SERVER_IP, SERVER_PORT)

sio = socketio.Server()
app = socketio.WSGIApp(sio)


@sio.event
def connect(sid, environ):
    print('connect ', sid)


@sio.event
def disconnect(sid):
    print('disconnect ', sid)


@sio.on('drag-mouse')
def msg(sid, data):
    from_x, from_y, to_x, to_y = decodeString(data, int)
    pyautogui.moveTo(from_x, from_y)
    pyautogui.dragTo(to_x, to_y, 0.3, button='left')
    return "OK", "Drag"


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)
