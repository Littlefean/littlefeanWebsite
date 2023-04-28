# -*- encoding: utf-8 -*-
"""
push 网站项目文件夹的发布
2021年08月18日
by littlefean
"""
import os
import sys
import getpass
import shutil


def main():
    """
    将website文件夹复制一份到我的桌面
    免除 less, md, txt 文件
    并删除一个名为 .idea 的文件夹
    """
    target = r'D:\桌面\html'

    copyFile(r'website', target)

    # path_data = r"D:\桌面\个人网站\.idea"
    # del_file(path_data)
    # os.removedirs(path_data)

    delFileType(target, "less")
    delFileType(target, "map")
    delFileType(target, "psd")
    delFileType(target, "ts")
    ...


def test():
    delFolderName(r"D:\桌面\新建文件夹 (3)", ".idea")
    ...


def delFolderName(path: str, folderName: str):
    """删除一个文件夹下指定名字的文件夹"""
    for i in os.listdir(path):
        file_data = path + "\\" + i  # 当前文件夹的下面的所有东西的绝对路径
        if os.path.isfile(file_data):
            # 是文件夹不用管
            ...
        else:
            if i == folderName:
                shutil.rmtree(file_data)
            else:
                delFolderName(file_data, folderName)


def delFileType(path: str, fileType: str):
    """删除一个文件夹下指定类型的文件"""
    for i in os.listdir(path):  # os.listdir(path_data)#返回一个列表，里面是当前目录下面的所有东西的相对路径
        file_data = path + "\\" + i  # 当前文件夹的下面的所有东西的绝对路径
        if os.path.isfile(file_data):  # os.path.isfile判断是否为文件,如果是文件,就删除.如果是文件夹.递归给del_file.
            if file_data.endswith(f".{fileType}"):
                os.remove(file_data)
        else:
            delFileType(file_data, fileType)


def del_file(path_data):
    for i in os.listdir(path_data):  # os.listdir(path_data)#返回一个列表，里面是当前目录下面的所有东西的相对路径
        file_data = path_data + "\\" + i  # 当前文件夹的下面的所有东西的绝对路径
        if os.path.isfile(file_data):  # os.path.isfile判断是否为文件,如果是文件,就删除.如果是文件夹.递归给del_file.
            os.remove(file_data)
        else:
            del_file(file_data)


def copyFile(source_path, target_path):
    """
    复制文件夹
    :param source_path: 被复制的文件夹 路径
    :param target_path: 复制到某个地方的文件夹路径
    :return: 无返回值
    """
    source_path_str = os.path.abspath(source_path)
    target_path_str = os.path.abspath(target_path)

    if not os.path.exists(target_path_str):
        # 如果目标路径不存在原文件夹的话就创建
        os.makedirs(target_path_str)

    if os.path.exists(source_path_str):
        # 如果目标路径存在原文件夹的话就先删除
        shutil.rmtree(target_path_str)

    shutil.copytree(source_path_str, target_path_str, ignore=shutil.ignore_patterns('log', ".idea", ".git"))


if __name__ == '__main__':
    test()
    # main()
