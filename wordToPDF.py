# -*- encoding: utf-8 -*-
"""
PyCharm wordToPDF
2022年03月27日
by littlefean
"""
from win32com.client import constants, gencache
import os


def createPdf(wordPath):
    """
    word转pdf
    word的后缀名要是docx。
    :param wordPath: word文件路径
    :param pdfPath:  生成pdf文件路径
    """
    print(f"正在转pdf{wordPath}到对应路径之下")
    try:
        word = gencache.EnsureDispatch('Word.Application')
        doc = word.Documents.Open(wordPath, ReadOnly=1)
        pdfPath = wordPath.replace(".docx", ".pdf")
        doc.ExportAsFixedFormat(pdfPath,
                                constants.wdExportFormatPDF,
                                Item=constants.wdExportDocumentWithMarkup,
                                CreateBookmarks=constants.wdExportCreateHeadingBookmarks)
        word.Quit(constants.wdDoNotSaveChanges)
    except Exception as e:
        print(f"转换{wordPath}失败{e}")


def transformAll(path):
    """
    给一个文件夹下所有的docx文件转成pdf文件
    :return:
    """
    for root, dirs, files in os.walk(path):
        # print(root, dirs, files)
        for file in files:
            if "." in file:
                if file.split(".")[-1].lower() == "docx" and ("学习笔记" in file or "摘抄" in file):
                    # todo 这段代码需要调整抽离出来复用性
                    createPdf(root + os.sep + file)
    ...


def main():
    transformAll("D:\\桌面\\创业课作业")
    return None


if __name__ == "__main__":
    main()
