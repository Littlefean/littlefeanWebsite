# -*- encoding: utf-8 -*-
"""
PyCharm myFtp
2021年08月22日
by littlefean
"""
# -*- encoding: utf-8 -*-
import ftplib
from ftplib import FTP
import os
import sys
import time
import socket


class MyFTP:
    """
        ftp自动下载、自动上传脚本，可以递归目录操作
        作者：欧阳鹏
        博客地址：http://blog.csdn.net/ouyang_peng/article/details/79271113
    """

    def __init__(self, host, port=21):
        """ 初始化 FTP 客户端
        参数:
                 host:ip地址

                 port:端口号
        """
        # print("__init__()---> host = %s ,port = %s" % (host, port))

        self.host = host
        self.port = port
        self.ftp = FTP()
        # 重新设置下编码方式
        self.ftp.encoding = 'gbk'
        self.log_file = open("log.txt", "a")
        self.file_list = []

    def login(self, username, password):
        """ 初始化 FTP 客户端
            参数:
                  username: 用户名

                 password: 密码
            """
        try:
            timeout = 60
            socket.setdefaulttimeout(timeout)
            # 0主动模式 1 #被动模式
            self.ftp.set_pasv(False)
            # 打开调试级别2，显示详细信息
            # self.ftp.set_debuglevel(2)

            self.debug_print('开始尝试连接到 %s' % self.host)
            self.ftp.connect(self.host, self.port)
            self.debug_print('成功连接到 %s' % self.host)

            self.debug_print('开始尝试登录到 %s' % self.host)
            self.ftp.login(username, password)
            self.debug_print('成功登录到 %s' % self.host)

            self.debug_print(self.ftp.welcome)
        except Exception as err:
            self.deal_error("FTP 连接或登录失败 ，错误描述为：%s" % err)
            pass

    def is_same_size(self, local_file, remote_file):
        """判断远程文件和本地文件大小是否一致

           参数:
             local_file: 本地文件

             remote_file: 远程文件
        """
        try:
            remote_file_size = self.ftp.size(remote_file)
        except Exception as err:
            # self.debug_print("is_same_size() 错误描述为：%s" % err)
            remote_file_size = -1

        try:
            local_file_size = os.path.getsize(local_file)
        except Exception as err:
            # self.debug_print("is_same_size() 错误描述为：%s" % err)
            local_file_size = -1

        self.debug_print('local_file_size:%d  , remote_file_size:%d' % (local_file_size, remote_file_size))
        if remote_file_size == local_file_size:
            return 1
        else:
            return 0

    def download_file(self, local_file, remote_file):
        """从ftp下载文件
            参数:
                local_file: 本地文件

                remote_file: 远程文件
        """
        self.debug_print("download_file()---> local_path = %s ,remote_path = %s" % (local_file, remote_file))

        if self.is_same_size(local_file, remote_file):
            self.debug_print('%s 文件大小相同，无需下载' % local_file)
            return
        else:
            try:
                self.debug_print('>>>>>>>>>>>>下载文件 %s ... ...' % local_file)
                buf_size = 1024
                file_handler = open(local_file, 'wb')
                self.ftp.retrbinary('RETR %s' % remote_file, file_handler.write, buf_size)
                file_handler.close()
            except Exception as err:
                self.debug_print('下载文件出错，出现异常：%s ' % err)
                return

    def download_file_tree(self, local_path, remote_path):
        """从远程目录下载多个文件到本地目录
                       参数:
                         local_path: 本地路径

                         remote_path: 远程路径
                """
        print("download_file_tree()--->  local_path = %s ,remote_path = %s" % (local_path, remote_path))
        try:
            self.ftp.cwd(remote_path)
        except Exception as err:
            self.debug_print('远程目录%s不存在，继续...' % remote_path + " ,具体错误描述为：%s" % err)
            return

        if not os.path.isdir(local_path):
            self.debug_print('本地目录%s不存在，先创建本地目录' % local_path)
            os.makedirs(local_path)

        self.debug_print('切换至目录: %s' % self.ftp.pwd())

        self.file_list = []
        # 方法回调
        self.ftp.dir(self.get_file_list)

        remote_names = self.file_list
        self.debug_print('远程目录 列表: %s' % remote_names)
        for item in remote_names:
            file_type = item[0]
            file_name = item[1]
            local = os.path.join(local_path, file_name)
            if file_type == 'd':
                print("download_file_tree()---> 下载目录： %s" % file_name)
                self.download_file_tree(local, file_name)
            elif file_type == '-':
                print("download_file()---> 下载文件： %s" % file_name)
                self.download_file(local, file_name)
            self.ftp.cwd("..")
            self.debug_print('返回上层目录 %s' % self.ftp.pwd())
        return True

    def upload_file(self, local_file, remote_file):
        """从本地上传文件到ftp

           参数:
             local_path: 本地文件

             remote_path: 远程文件
        """
        if not os.path.isfile(local_file):
            self.debug_print('%s 不存在' % local_file)
            return

        if self.is_same_size(local_file, remote_file):
            self.debug_print('跳过相等的文件: %s' % local_file)
            return

        buf_size = 1024
        file_handler = open(local_file, 'rb')
        self.ftp.storbinary('STOR %s' % remote_file, file_handler, buf_size)
        file_handler.close()
        self.debug_print('上传: %s' % local_file + "成功!")

    def upload_file_tree(self, local_path, remote_path):
        """从本地上传目录下多个文件到ftp
           参数:

             local_path: 本地路径

             remote_path: 远程路径
        """
        if not os.path.isdir(local_path):
            self.debug_print('本地目录 %s 不存在' % local_path)
            return
        """
        创建服务器目录
        """
        try:
            self.ftp.cwd(remote_path)  # 切换工作路径
        except Exception as e:
            base_dir, part_path = self.ftp.pwd(), remote_path.split('/')
            for p in part_path[1:-1]:
                base_dir = base_dir + p + '/'  # 拼接子目录
                try:
                    self.ftp.cwd(base_dir)  # 切换到子目录, 不存在则异常
                except Exception as e:
                    print('INFO:', e)
                    self.ftp.mkd(base_dir)  # 不存在创建当前子目录
        # self.ftp.cwd(remote_path)
        self.debug_print('切换至远程目录: %s' % self.ftp.pwd())

        local_name_list = os.listdir(local_path)
        self.debug_print('本地目录list: %s' % local_name_list)
        # self.debug_print('判断是否有服务器目录: %s' % os.path.isdir())

        for local_name in local_name_list:
            src = os.path.join(local_path, local_name)
            print("src路径==========" + src)
            if os.path.isdir(src):
                try:
                    self.ftp.mkd(local_name)
                except Exception as err:
                    self.debug_print("目录已存在 %s ,具体错误描述为：%s" % (local_name, err))
                self.debug_print("upload_file_tree()---> 上传目录： %s" % local_name)
                self.debug_print("upload_file_tree()---> 上传src目录： %s" % src)
                self.upload_file_tree(src, local_name)
            else:
                self.debug_print("upload_file_tree()---> 上传文件： %s" % local_name)
                self.upload_file(src, local_name)
        self.ftp.cwd("..")

    def close(self):
        """ 退出ftp
        """
        self.debug_print("close()---> FTP退出")
        self.ftp.quit()
        self.log_file.close()

    def debug_print(self, s):
        """ 打印日志
        """
        self.write_log(s)

    def deal_error(self, e):
        """ 处理错误异常
            参数：
                e：异常
        """
        log_str = '发生错误: %s' % e
        self.write_log(log_str)
        sys.exit()

    def write_log(self, log_str):
        """ 记录日志
            参数：
                log_str：日志
        """
        time_now = time.localtime()
        date_now = time.strftime('%Y-%m-%d', time_now)
        format_log_str = "%s ---> %s \n " % (date_now, log_str)
        print(format_log_str)
        self.log_file.write(format_log_str)

    def get_file_list(self, line):
        """ 获取文件列表
            参数：
                line：
        """
        file_arr = self.get_file_name(line)
        # 去除  . 和  ..
        if file_arr[1] not in ['.', '..']:
            self.file_list.append(file_arr)

    @staticmethod
    def get_file_name(line):
        """ 获取文件名
            参数：
                line：
        """
        pos = line.rfind(':')
        while line[pos] != ' ':
            pos += 1
        while line[pos] == ' ':
            pos += 1
        file_arr = [line[0], line[pos:]]
        return file_arr

    def clearTree(self):
        """
        清空远程ftp的目录
        必须保证ftp当前在根目录下
        必须假设文件中不含有没有后缀名的文件，文件夹也不能有点儿。
        因为 此方法辨认文件夹和文件的方法是看名字里是否含有 "."
        :return:
        """
        print("-*-" * 100)

        def delFolder(nowPath: str):
            self.ftp.cwd(nowPath)  # 进入这个文件夹
            print("进入文件夹", nowPath)
            nowArr = self.ftp.nlst()
            print(nowArr)
            for a in nowArr:
                if "." in a:
                    self.ftp.delete(a)  # 删除文件
                    print("删除文件", a)
                else:
                    # 这是一个文件夹
                    delFolder(a)
            self.ftp.cwd("..")  # 从进入的文件夹中再返回出来
            try:
                self.ftp.rmd(nowPath)  # 删除这个文件夹
                print("删除文件夹", nowPath)
            except ftplib.error_perm:
                print("无法删除这个文件夹", nowPath)

        try:
            arr = self.ftp.nlst()
            for item in arr:
                if "." in item:
                    self.ftp.delete(item)  # 删除文件
                    print("删除根目录下的文件", item)
                else:
                    delFolder(item)
        except ftplib.error_perm:
            print("当前ftp根目录已经是空的了")

        print("-*-" * 100)

