# -*- encoding: utf-8 -*-
"""
用于修改文件的时间属性
PyCharm modifyFileTime
2021年08月13日
by littlefean
"""
from win32file import CreateFile, SetFileTime, GetFileTime, CloseHandle
from win32file import GENERIC_READ, GENERIC_WRITE, OPEN_EXISTING
# from pywintypes import Time
import time


def modifyFileTime(filePath, createTime, modifyTime, accessTime, offset):
    """
    用来修改任意文件的相关时间属性，时间格式：YYYY-MM-DD HH:MM:SS 例如：2019-02-02 00:01:02
    :param filePath: 文件路径名
    :param createTime: 创建时间
    :param modifyTime: 修改时间
    :param accessTime: 访问时间
    :param offset: 时间偏移的秒数,tuple格式，顺序和参数时间对应
    """
    try:
        format = "%Y-%m-%d %H:%M:%S"  # 时间格式
        cTime_t = timeOffsetAndStruct(createTime, format, offset[0])
        mTime_t = timeOffsetAndStruct(modifyTime, format, offset[1])
        aTime_t = timeOffsetAndStruct(accessTime, format, offset[2])

        fh = CreateFile(filePath, GENERIC_READ | GENERIC_WRITE, 0, None, OPEN_EXISTING, 0, 0)
        createTimes, accessTimes, modifyTimes = GetFileTime(fh)

        createTimes = Time(time.mktime(cTime_t))
        accessTimes = Time(time.mktime(aTime_t))
        modifyTimes = Time(time.mktime(mTime_t))
        SetFileTime(fh, createTimes, accessTimes, modifyTimes)
        CloseHandle(fh)
        return 0
    except:
        return 1


def timeOffsetAndStruct(times, format, offset):
    return time.localtime(time.mktime(time.strptime(times, format)) + offset)


# 调用
cTime = "2019-02-02 00:01:02"  # 创建时间
mTime = "2019-02-02 00:01:03"  # 修改时间
aTime = "2019-02-02 00:01:04"  # 访问时间

fName = r"E:\test_pro\fileOperate\test.xlsx"  # 文件路径
offset = (0, 1, 2)  # 偏移的秒数
r = modifyFileTime(fName, cTime, mTime, aTime, offset)
if r == 0:
    print('修改完成')
if r == 1:
    print('修改失败')


def main():
    ...


if __name__ == '__main__':
    main()
