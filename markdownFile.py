# -*- encoding: utf-8 -*-
"""
markdownFile 类
2021年08月09日
by littlefean
"""
import time

import os
from bs4 import BeautifulSoup

from htmlString import *
from mdToHtml import md_to_html
import shutil


class markdownFile:
    """
    md 文件类
    """

    def __init__(self,
                 fileName: str,
                 createTime,
                 modifyTime,
                 series: str,
                 wordCount: int,
                 mdContent: str,
                 filePathName: str,
                 fileType: str,
                 srcPath: str):
        """
        外部禁止调用此方法
        :param fileName: 文件名，不包含后缀，也不包括学习笔记四个字
        :param createTime: 文件的创建时间
        :param modifyTime: 文件的修改时间 格式【2021-03-01 15:38:52】
        :param series: 该学习笔记所属于的系列
        :param wordCount: 该学习笔记的字数统计
        """
        self.mdContent = mdContent
        self.fileName = fileName
        self.filePathName = filePathName  # 从目标根文件夹一直到md文件之前路径上的名字用-相连成的字符串
        self.createTime = createTime
        self.modifyTime = modifyTime
        self.series = series
        self.wordCount = wordCount
        self.fileType = fileType
        self.srcPath = srcPath  # 源文件的绝对路径
        ...

    @classmethod
    def getInstance(cls, pathName: str):
        """
        传入一个绝对路径，将该绝对路径转化为一个md文件对象
        :param pathName: 传入一个绝对路径
        :return: None
        """

        # 获取名称
        fileName = pathName.split(os.sep)[-1].split(".")[0].replace("学习笔记", "").strip()
        # 获取文件后缀名类型
        fileType = pathName.split(os.sep)[-1].split(".")[-1].lower()
        # ！文件名前面不要有空格 " xx.html"
        # 获取文件创建时间和上次修改时间
        cTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getctime(pathName)))
        mTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getmtime(pathName)))
        # 获取系列
        pathArr = pathName.split(os.sep)
        """
        获取该文件所在【学习】文件夹下的第一层文件夹的名字
        """
        seriesName = ""
        for i in range(len(pathArr)):
            if pathArr[i] == "学习":
                if i + 1 < len(pathArr):
                    seriesName = pathArr[i + 1]
                    break
        # 获取 filePathName

        # print(pathArr)
        finalArr = []
        start = False
        for i in range(len(pathArr)):
            if i == len(pathArr) - 1:
                break
            if pathArr[i] == "学习":
                start = True
            if start:
                finalArr.append(pathArr[i])
        filePathName = "-".join(finalArr)
        # print(filePathName)
        # 获取字数统计
        countNum = 0
        words = ""
        if fileType == "md":
            try:
                with open(pathName, "r", encoding='utf-8') as f:
                    words = f.read()
            except UnicodeDecodeError:
                with open(pathName, "r", encoding='ANSI') as f:
                    print("utf-8解码不支持，转用ANSI解码")
                    words = f.read()
            except Exception as e:
                print(e, f"无法读取{fileName}的字数，默认100")
                words = ""
                countNum = 100
            for char in words:
                if char.isdigit() or char.isalpha():
                    countNum += 1
                elif u'\u4e00' <= char <= u'\u9fff':
                    countNum += 1
        elif fileType == "pdf":
            countNum = 100
        return cls(fileName, cTime, mTime, seriesName, countNum, words, filePathName, fileType, pathName)

    def __str__(self):
        """
        self.mdContent = mdContent
        self.fileName = fileName
        self.createTime = createTime
        self.modifyTime = modifyTime
        self.series = series
        self.wordCount = wordCount
        :return:
        """
        return f"{self.fileName}, {self.series}, {self.wordCount}, {self.createTime}, {self.modifyTime}"

    def toJsonStr(self):
        res = "{" + f""" "fileName" :"{self.fileName}",
              "createTime":"{self.createTime}",
              "modifyTime":"{self.modifyTime}",
              "series":"{self.series}",
            "wordCount":{self.wordCount},
            "filePathName":"{self.filePathName}" """ + "}"
        return res

    def toHtmlStr(self):
        contentStr = ""
        if self.fileType == "md":
            contentStr = md_to_html(self.mdContent)
        elif self.fileType == "pdf":
            # iframe方式
            # contentStr = f"{PDFString}<iframe src='{self.srcPath.split(os.sep)[-1]}'></iframe>"
            # embed方式 https://blog.csdn.net/Andrew83/article/details/88714317
            contentStr = f"{PDFString}<embed src='{self.srcPath.split(os.sep)[-1]}'>"
            ...
        htmlStr = f"""
                <html lang="zh-CN">
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>{self.fileName}</title>
                    <link rel="stylesheet" href="../../css/night/mermaid.dark.css">
                    <link rel="stylesheet" href="../../css/night/codeblock.dark.css">
                    <link rel="stylesheet" href="../../css/night/sourcemode.dark.css">
                    
                    <link rel="stylesheet" href="../../css/mys.css">
                    <link rel="stylesheet" href="../../css/myAdded.css">
                    <link rel="stylesheet" href="../../cssMy/nav/nav-basic.css">
                    <link rel="stylesheet" href="../../cssMy/footer/footer-basic.css">
                <body>
                {NAV}
                <div class="canvasTmp">
                    <canvas width="1920" height="1080"></canvas>
                </div>
                <button id="changeStyle">太黑了</button>
                <main>
                    {contentStr}
                </main>
                {FOOTER}
                </body>
                </html>
                <script src="../../js/util.js"></script>
                <script src="../../js/startSky.js"></script>
                <script src="../../js/mdPageUtil.js"></script>
                """
        return htmlStr

    def saveHtmlFile(self):
        """
        将这个文件对象，保存到网页项目中的html文件夹

        :return:
        """
        if not os.path.exists(f'website\\html\\{self.series}'):
            # 若果是新创建的系列
            os.makedirs(f'website\\html\\{self.series}')  # 就新创建一个文件夹系列

        # 即将要保存到的html文件路径位置
        path = f'website\\html\\{self.series}\\{self.fileName}.html'

        oldHtml = self.toHtmlStr()  # 获取这个笔记对象将转成html的内容

        if self.fileType == "md":
            soup = BeautifulSoup(oldHtml)
            imgList = soup.select("img")
            imgPathList = []
            flag = False  # 是否有需要复制引用的图片
            for img in imgList:
                src = img.get("src")
                if str(src).startswith("http") or str(src).startswith(".."):
                    pass
                else:
                    flag = True
                    imgPathList.append(str(src))
            if flag:
                try:
                    if os.path.exists(f'website\\html\\{self.series}\\{self.fileName}'):
                        shutil.rmtree(f'website\\html\\{self.series}\\{self.fileName}')
                    os.mkdir(f'website\\html\\{self.series}\\{self.fileName}')
                except PermissionError:
                    print("无法访问这个文件夹" + f'website\\html\\{self.series}\\{self.fileName}')
                    ...
                for i, pathStr in enumerate(imgPathList):
                    # pathStr: D:\学习\考研相关\计算机网络\pic\image-20211104102337671.png
                    pathStrEnd = pathStr.split(".")[-1]  # png? jpg? jpeg?
                    # newPath: website\\html\\{self.series}\\ 下创建一个 {self.fileName}
                    try:
                        shutil.copyfile(pathStr, f'website\\html\\{self.series}\\{self.fileName}\\{i}.{pathStrEnd}')
                        oldHtml = oldHtml.replace(pathStr, f"{self.fileName}\\{i}.{pathStrEnd}")
                    except Exception as e:
                        print(f"复制笔记内图片时候出现了异常{pathStr}")
                        print(e)
        elif self.fileType == "pdf":
            # 将pdf源复制到这里来
            shutil.copyfile(self.srcPath, f'website\\html\\{self.series}\\{self.srcPath.split(os.sep)[-1]}')
            ...
        open(f'{path}', 'w', encoding='utf8').write(oldHtml)
        print(f"保存成功{path}")

    ...
