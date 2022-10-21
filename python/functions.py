def encodeString(*datas):
    """encodeString([])

    사용법: encodeString 함수에 배열을 파라미터로 전달하면 string으로 return됨
    
    예: encodeString(3,4)는 "3,4"를 return함
    """
    list = [ str(item) for item in datas ]
    return ",".join(list)
def decodeString(str_data, type = str):
    """decodeString("")

    사용법: decodeString 함수에 str을 파라미터로 전달하면 [] 배열로 return됨

    예: decodeString("your,name")은 ["your", "name"]을 return함
    예: decodeString("1,3")은 ["1", "3"]을 return함
    
    배열 속 값은 모두 str 타입
    """
    list = str_data.split(',')
    list = [ type(item) for item in list ]
    return list