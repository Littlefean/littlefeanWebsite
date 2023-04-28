# -*- encoding: utf-8 -*-
"""
PyCharm ftpPush
2021年08月22日
by littlefean
"""
from myFtp import MyFTP


def main():
    my_ftp = MyFTP("012.3vftp.cn")
    my_ftp.login("yysfyyds", "123456xxxx")

    my_ftp.clearTree()

    my_ftp.upload_file_tree("D:\\桌面\\overWorld", ".")

    my_ftp.close()
    ...


def start():
    my_ftp = MyFTP("012.3vftp.cn")
    my_ftp.login("littlefean", "134514web")

    my_ftp.clearTree()

    my_ftp.upload_file_tree("D:\\桌面\\个人网站", ".")

    my_ftp.close()
    ...


if __name__ == "__main__":
    main()
    ...
