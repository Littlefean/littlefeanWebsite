"""
个人网站内容更新程序
2021.8.9
by littlefean
"""
import json
import os
import random
import shutil
from datetime import datetime, timedelta
from PIL import Image

from markdownFile import markdownFile

import clone
from htmlString import *
from wordToPDF import transformAll


def main():
    """
    一个脚本一运行，就可以遍历我的学习文件夹，找到所有的学习笔记md文档，
    检测他们的修改日期
    如果出现了新的md文件，则记录这个md文件的系，添加到数据库，
        如果出现了新的系别，则更新数据库的系别。
    如果修改日期和以前数据库里的修改日期不相符，那么更新覆盖项目里的html文件
    如果相符，pass
    """
    transformAll("D:\\学习")
    renewHtml()
    writeMenu()
    writeIndex()
    writeHistory()
    writeHistorySignal()
    writeOthers()
    # 复制本地文件
    clone.main()

    # 发布
    # ftpPush.start()

    showStr = """
    python 帮我收集所有md笔记文件
    python 帮我把所有的笔记文件转化成html
    python 帮我生成一份学习历史图
    python 帮我把学习历史图写成html
    js 帮我随机画了上千个恒星，上百个流星，数十个行星
    python 帮我把网页项目复制了一份到桌面上
    python 帮我把桌面上的网页项目去除掉了不必要的.less文件
    python 帮我把这个文件夹利用ftp发布到了网上。
    
    收集笔记 -> 写页面 -> 做特效 -> 备份 -> 发布
    一气呵成
    """
    input(showStr)
    ...


def test():
    writeOthers()


def writeOthers():
    """
    生成其他作品界面的文件的方法
    该方法执行会读取 otherHtmls.txt
    会以该文件中的命名来创建对应的项目文件到otherHtml文件夹中
    同时会在 website\\image\\otherHtml\\{name}.png 这里创建标图
    如果想要给已有的作品项目改名，需要改txt里的名字，同时也要改这个路径下的图片名，同步
    """
    # 先删除文件夹
    for file in os.listdir("website\\otherHtml"):
        file_data = "website\\otherHtml" + "\\" + file  # 当前文件夹的下面的所有东西的绝对路径
        if os.path.isfile(file_data):
            # 根目录下面的文件不删除
            ...
        else:
            shutil.rmtree(file_data)
            print(f"旧的项目删除掉: {file_data}")
    aListStr = ""
    print("删除完毕")
    # 获取要生成的列表
    with open("otherHtmls.txt", encoding="utf-8") as f:
        for line in f.readlines():
            if line.strip() == "":
                continue
            if line.startswith("#"):
                continue
            arr = line.split()
            name = arr[0]  # name 是txt中给项目定义的文件名
            path = line[line.find("D:\\"):].replace("\n", "")
            print(name)
            print(f"<<{path}>>")
            # 新建文件夹，把里面的东西复制进来
            clone.copyFile(path, f"website\\otherHtml\\{name}")

            # 看能不能找到图片，如果不能找到图片就创造图片
            imgList = os.listdir("website\\image\\otherHtml")
            if name + ".png" not in imgList:
                im = Image.new("RGBA", (100, 100), (100, 200, 255))
                im.save(f"website\\image\\otherHtml\\{name}.png")
            # 构建项目字符串
            href = f"{name}/index.html"
            if os.path.exists(f"website\\otherHtml\\{name}\\index.html"):
                print(f"这个子空间项目{name}中有index.html")
            else:
                print(f"!!这个子空间项目{name}中没有index.html")
                # 在项目根目录中随便找一个html，如果没有html，就忽略这个，
                # 如果只有一个html，就是那个，如果有多个，忽略带test的
                htmlSet = []  # 里面存放 href可以直接使用的字符串
                for projectFile in os.listdir("website/otherHtml/" + name):
                    print("\t111", projectFile)
                    if projectFile.endswith(".html"):
                        htmlSet.append(f"{name}/{projectFile}")
                print(htmlSet)
                if len(htmlSet) == 0:
                    print(f"\t 没有含有html文件，在这个{name}根目录下")
                    continue
                newSet = []
                for hrefCode in htmlSet:
                    if "test" in hrefCode:
                        continue
                    newSet.append(hrefCode)
                if len(newSet) == 0:
                    print(f"\t 全都是含有test的html文件，在这个{name}根目录下")
                    href = random.choice(htmlSet)
                else:
                    href = random.choice(newSet)
                    ...
                ...
            aListStr += f"""<a class="item" href="{href}" target="_blank">
                <img src="../image/otherHtml/{name}.png" alt="" class="itemIcon">
                <h4>{name}</h4>
            </a>\n"""

            ...
        ...
    # 删除一些不必要的东西
    clone.delFileType(f"website\\otherHtml", "less")
    clone.delFileType(f"website\\otherHtml", "map")
    clone.delFileType(f"website\\otherHtml", "ts")
    clone.delFileType(f"website\\otherHtml", "log")
    clone.delFileType(f"website\\otherHtml", "gitignore")
    clone.delFolderName("website\\otherHtml", ".idea")
    clone.delFolderName("website\\otherHtml", ".git")
    clone.delFolderName("website\\otherHtml", ".psd")
    clone.delFolderName("website\\otherHtml", ".xmind")
    with open(f"website\\otherHtml\\otherHtmlIndex.html", "w", encoding="utf-8") as f:
        f.write(f"""
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <title>{TITLE}-子空间</title>
            <link rel="stylesheet" href="../cssMy/index.css">
            <link rel="shortcut icon" href="../icons/favicon.ico"/>
            <link rel="stylesheet" href="../cssMy/nav/nav-basic.css">
            <link rel="stylesheet" href="../cssMy/footer/footer-basic.css">
            <link rel="stylesheet" href="../cssMy/otherHtml.css">
        </head>
        
        <body>
        
        <div class="canvasTmp">
            <canvas width="1920" height="1080"></canvas>
        </div>
        <nav>
            <div class="title">
                <h1>{TITLE}</h1>
                <p>岳同学的学习网站</p>
            </div>
            <ul>
                <!--这些要去掉前面的点点点-->
                <li><a href="../index.html">首页</a></li>
                <li><a href="../history/historySingleLine.html">历史</a></li>
                <li><a href="../htmlMy/howWork.html">关于</a></li>
                <li><a href="">友情连接</a></li>
            </ul>
        </nav>
        <main>
            <h1>子空间</h1>
            <h2>网页作品集</h2>
            <div class="otherBox">
            {aListStr}
            </div>
            <div class="bottomContent">
                <span id="activeContent"></span>
            </div>
        </main>
        <footer class="mainFooter">
            <ul class="topUl">
                <li><a href="../index.html">首页</a></li>
                <li><a href="#">其他作品</a></li>
                <li><a href="../htmlMy/howWork.html">网站说明</a></li>
                <li><a href="#">回到顶部</a></li>
            </ul>
            <div class="mid">
                <div class="left">
                    <h2>{TITLE}</h2>
                    <p>{TITLE}是岳同学做的一个包含很多很多学习笔记的宇宙风格的网站，所有人都可以看学习笔记，希望其他人能够少走弯路</p>
                </div>
                <div class="center">
                    <h2>岳同学</h2>
                    <table>
                        <tr>
                            <td>bilibili</td>
                            <td><img src="../image/footerIcon/哔哩哔哩.png" alt=""></td>
                            <td><a href="https://space.bilibili.com/480804525">阿-岳同学</a></td>
                        </tr>
                        <tr>
                            <td>知乎</td>
                            <td><img src="../image/footerIcon/知乎.png" alt=""></td>
                            <td><a href="https://www.zhihu.com/people/lan-xi-36-22">诗云</a></td>
                        </tr>
                        <tr>
                            <td>简书</td>
                            <td><img src="../image/footerIcon/简书.jpg" alt=""></td>
                            <td><a href="https://www.jianshu.com/u/b69af9df5272">littlefean</a></td>
                        </tr>
                        <tr>
                            <td>CSDN</td>
                            <td><img src="../image/footerIcon/csdn.jpg" alt=""></td>
                            <td><a href="https://blog.csdn.net/weixin_42318668">Littlefean</a></td>
                        </tr>
                    </table>
                </div>
                <div class="right">
                    <h2>友情链接</h2>
                    <ul>
                        {FRIENDS}
                    </ul>
                </div>
            </div>
            <p class="sub">若有内容侵权，请联系QQ:2385190373 或者 2385190373@qq.com 我会进行删除处理
                <a href="https://beian.miit.gov.cn" id="beiAnId">{beiAnNumber}</a>
            </p>
        </footer>
        </body>
        <script src="../js/util.js"></script>
        <script src="../js/typed.js"></script>
        <!--<script src="../js/index.js"></script>-->
        <script src="../js/startSky.js"></script>
        <script src="../js/indexTyped.js"></script>
        <script src="../js/otherHtml.js"></script>
        </html>
        """)
    print("=======\n其他的html生成成功\n=======")
    ...


def writeHistorySignal():
    # 更新单线的历史长河界面
    allStyArr = []  # 存放所有的md对象转化成的json字符串
    jsonFileArr = os.listdir("website\\json")
    for jsonFile in jsonFileArr:
        with open(f"website\\json\\{jsonFile}", "r", encoding="utf-8") as f:
            styArr = json.loads(f.read())
            allStyArr += styArr

    # 添加重要事件
    with open(f"website\\jsonMy\\重要节点事件.json", "r", encoding="utf-8") as f:
        styArr = json.loads(f.read())
        allStyArr += styArr
    # 对此数组在时间上进行排序
    allStyArr.sort(key=lambda x: x["createTime"])
    # allStyArr.reverse()

    logs = ""

    for sty in allStyArr:
        timeStr = sty['createTime']
        date = timeStr.split(" ")[0].split("-")
        itemContent = f"""<div class='time'>
                            <span class="year">{date[0]}</span>
                            <span class="month">{date[1]}</span>
                            <span class="day">{date[2]}</span>
                            <span class="t">{timeStr.split(" ")[-1]}</span>
                          </div>"""
        importantEvent = "false"
        if sty["series"] == "事件类":
            importantEvent = "true"
            itemContent += f"<div class='name'>{sty['fileName']}</div>"
        else:
            itemContent += f"<div class='name'>开始学习 {sty['fileName']}</div>"
            itemContent += f"<div class='series'>所属系列：{sty['series']}</div>"

        logs += f"<div class='item' data-event='{importantEvent}'>{itemContent}</div>"
        ...

    with open(f"website\\history\\historySingleLine.html", "w", encoding="utf-8") as f:
        f.write(f"""
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <title>{TITLE}-学习轨迹</title>
            <link rel="stylesheet" href="../cssMy/historySingleLine.css">
            <link rel="stylesheet" href="../cssMy/nav/nav-basic.css">
        </head>

        <body>
        {NAV_}
        <div class="canvasTmp">
            <canvas width="1920" height="1080"></canvas>
        </div>
        <h1 class="mainTitle">事件时间轴</h1>
            <div class="logs">{logs}</div>
        </body>
        <script src="../js/util.js"></script>
        <script src="../js/startSky.js"></script>
        <script src="../js/historySingleLine.js"></script>
        </html>
        """)
    ...


def writeHistory():
    # 更新历史长河界面
    allStyArr = []  # 存放所有的md对象转化成的json字符串
    jsonFileArr = os.listdir("website\\json")
    for jsonFile in jsonFileArr:
        with open(f"website\\json\\{jsonFile}", "r", encoding="utf-8") as f:
            styArr = json.loads(f.read())
            allStyArr += styArr
    # 对此数组在时间上进行排序
    allStyArr.sort(key=lambda x: x["createTime"])
    allStyArr.reverse()
    topTime = allStyArr[0]["modifyTime"]  # 最上面的时间
    for sty in allStyArr:
        if sty["modifyTime"] > topTime:
            topTime = sty["modifyTime"]
    bottomTime = allStyArr[-1]["createTime"]  # 最下面的时间
    pattern = "%Y-%m-%d %H:%M:%S"
    topDay = datetime.strptime(topTime, pattern)
    bottomDay = datetime.strptime(bottomTime, pattern)
    dt = topDay - bottomDay
    dayHeightPx = 20  # 一天的高度
    # dt
    wayNum = 20  # 轨道的数量
    ways = [[] for _ in range(wayNum)]
    wayWeight = 100 / wayNum  # 单位是 %
    content = ""
    for sty in allStyArr:
        mDay = datetime.strptime(sty["modifyTime"], pattern)  # 最近修改的时间对象
        cDay = datetime.strptime(sty["createTime"], pattern)  # 创建时间
        dtTop = topDay - mDay
        dtHeight = mDay - cDay
        startInt = dtTop.days
        endInt = (dtTop + dtHeight).days
        print(startInt, endInt)

        styWay = 0  # 默认零轨道
        # 遍历所有轨道 寻找空余轨道
        for way in ways:
            if len(way) == 0:
                way.append([startInt, endInt])
                break
            # 如果当前的md文件在该轨道内被占用了位置了
            isNotCanPush = False
            for part in way:
                if startInt <= part[1] + 0:
                    # 已经排好顺序了，直接比较就可以了
                    isNotCanPush = True
                    break
            if isNotCanPush:
                styWay += 1
                continue
            else:
                way.append([startInt, endInt])
                break
        else:
            # 如果这所有轨道都被集满了
            styWay = wayNum
            print("!!!")
        style = f'top:{dtTop.days * dayHeightPx}px; ' \
                f'height: {dtHeight.days * dayHeightPx}px; ' \
                f'left: {styWay * wayWeight}%;' \
                f'width: {wayWeight}%;'
        content += f"<div class='mdItem' style='{style}' title='{sty['fileName']}'>"
        content += f'<h3>{sty["fileName"]}</h3>'
        content += f'<p class="startT">创建时间：{sty["createTime"]}</p>'
        content += f'<p class="endT">最近修改：{sty["modifyTime"]}</p>'
        content += f'<i class="endT">系列：{sty["series"]}</i>'
        content += f'<b>字数：{sty["wordCount"]}</b>'
        content += "</div>"
    dayCount = 10  # 以多少天为一个刻度
    dTime = topDay
    timeScales = ""
    di = 0
    while dTime >= bottomDay:
        string = str(dTime).split(" ")[0]
        timeScales += f"<p class='timeScale' style='top:{dayHeightPx * dayCount * di}px;'>{string}</p>"
        dTime -= timedelta(days=dayCount)
        di += 1

    with open(f"website\\history\\history.html", "w", encoding="utf-8") as f:
        f.write(f"""
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <title>{TITLE}-历史</title>
            <link rel="stylesheet" href="../cssMy/history.css">
            <link rel="stylesheet" href="../cssMy/nav/nav-basic.css">
        </head>
        
        <body>
        {NAV_}
            <div class="canvasTmp">
                <canvas width="1920" height="1080"></canvas>
            </div>
            <h1 class="mainTitle">纪元表</h1>
            <div class="studyItems" style="height:{dt.days * dayHeightPx}px">
            {timeScales}
            {content}
            </div>
        </body>
        
        </html>
        <script src="../js/util.js"></script>
        <script src="../js/typed.js"></script>
        <script src="../js/index.js"></script>
        <script src="../js/history.js"></script>
        <script src="../js/startSky.js"></script>
        """)


def writeIndex():
    # 写主菜单的html文件
    content = '''<div class="timeLine"></div>'''
    htmlPath = "website" + os.sep + "html"
    arr = os.listdir(htmlPath)
    for seriesName in arr:
        with open(f"website\\json\\{seriesName}.json", "r", encoding="utf-8") as f:
            jsonObj = json.loads(f.read())
            # 获取该系列的数量
            n = len(jsonObj)

            def getLast(x):
                return x["modifyTime"]

            # 获取最近一次的更新
            mdLast = max(jsonObj, key=getLast)
        attr = f'data-count="{n}" data-lastUpdate="{mdLast["modifyTime"]}"'
        title = f"<span class='title'>{seriesName}</span>"
        iconBox = f"""<div class="iconCubeBox"></div>"""
        a = f'<a href="html/{seriesName}/menu.html" target="_blank">{iconBox}{title}</a>'
        container = f"<div class='container'>\n{a}\n</div>"
        content += f'<div class="series" {attr}>\n{container}\n</div>'

    with open("website\\index.html", "w", encoding="utf-8") as f:
        f.write(f"""
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <title>{TITLE}</title>
            <link rel="stylesheet" href="cssMy/index.css">
            <link rel="shortcut icon" href="icons/favicon.ico" /> 
        </head>
        <body>
            <div class="canvasTmp">
                <canvas width="1920" height="1080"></canvas>
            </div>
            <div class="menu">
                <div class="inner">
                    <a href="otherHtml/otherHtmlIndex.html">子空间</a>
                    <a href="history/history.html">宇宙纪元表</a>
                    <a href="history/historySingleLine.html">世界线</a>
                    <a href="htmlMy/howWork.html">关于</a>
                </div>
            </div>
            <main>
            {content}
            <div class="bottomContent">
                <span id="activeContent"></span>
            </div>
            <div class="indexFooter">
                <a href="https://beian.miit.gov.cn" id="beiAnId">{beiAnNumber}</a>
            </div>
            </main>
        </body>
        </html>
        <script src="js/util.js"></script>
        <script src="js/typed.js"></script>
        <script src="js/index.js"></script>
        <script src="js/startSky.js"></script>
        <script src="js/indexTyped.js"></script>
        """)
    ...


def writeMenu():
    """
    更新每个二级页面html里面的内容
    为所有的系添加或者更新 html menu
    :return:
    """
    htmlPath = "website" + os.sep + "html"
    arr = os.listdir(htmlPath)
    # 遍历的是当前website文件夹下的html目录，遍历每一个一级大类文件夹
    for seriesName in arr:
        print(htmlPath + os.sep + seriesName)
        content = ""
        oderContent = ""
        # 在每一个一级大类文件夹里遍历所有的文件
        for htmlFile in os.listdir(htmlPath + os.sep + seriesName):
            # 首先要先扫面自己的文件夹下的所有文件，只筛选出 html文件作为二级页面的跳转链接。
            if os.path.isdir(htmlFile):  # 防止出现两个一模一样的
                continue
            if htmlFile == "menu":
                continue
            if not htmlFile.endswith(".html"):
                continue
            fileName = htmlFile.replace(".html", "")
            if fileName != 'menu':
                # 需要统计字数和更新时间
                wNum = 0
                tStr = "--"
                with open(f"website\\json\\{seriesName}.json", "r", encoding="utf-8") as f:
                    jsObj = json.loads(f.read())
                    for jo in jsObj:
                        if jo["fileName"] == fileName:
                            wNum = jo["wordCount"]
                            tStr = jo["modifyTime"]
                            ctStr = jo["createTime"]
                            imgName = jo["filePathName"]
                # 看能不能找到图片，如果不能找到图片就创造图片
                imgList = os.listdir("website\\image\\mdShowImg")
                htmlImgPath = f"../../image/mdShowImg/{imgName}.png"
                if imgName + ".png" not in imgList:
                    im = Image.new("RGBA", (100, 100), (100, 200, 255))
                    im.save(f"website\\image\\mdShowImg\\{imgName}.png")
                    ...
                attr = f'data-wordNum="{wNum}" data-update="{tStr}"'
                attrOrder = f'data-wordNum="{wNum}" data-update="{tStr}" data-crate="{ctStr}"'
                a = f'<a href="{fileName.replace(" ", "%20")}.html" target="_blank">{fileName}</a>'
                title = f'<h3 class="title">{fileName}</h3>'
                content += f'<div class="planet" {attr}>\n<div class="container">\n{a}\n</div>\n</div>'
                icon = f'<div class="iconBox">\n<img src="{htmlImgPath}" alt="">\n</div>'
                oderContent += f'<a href="{fileName.replace(" ", "%20")}.html" ' \
                               f'target="_blank" class="order" {attrOrder}>\n{icon}{title}\n</a>'

        with open(htmlPath + os.sep + seriesName + os.sep + "menu.html", "w", encoding="utf-8") as f:
            f.write(f"""
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, 
                      maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>{TITLE}-{seriesName}</title>
                <link rel="stylesheet" href="../../cssMy/menu.css">
                <link rel="shortcut icon" href="../../icons/favicon.ico" /> 
                <link rel="stylesheet" href="../../cssMy/nav/nav-basic.css">
                <link rel="stylesheet" href="../../cssMy/footer/footer-basic.css">
            </head>
            <body>
            {NAV}
            <h1>{seriesName}</h1>
            <div class="canvasTmp">
                <canvas width="1920" height="1080"></canvas>
            </div>
            <div class="orders">
                {oderContent}
            </div>
            <h1>星系内容展示图</h1>
            <div class="planets">
                {content}
            </div>
            {FOOTER}
            </body>
            </html>
            <script src="../../js/util.js"></script>
            <script src="../../js/menu.js"></script>
            <script src="../../js/AsteroidBelt.js"></script>
            """)
    ...


def renewHtml():
    # 更新所有 md 笔记 转化为html文件
    def nameExp(nameString: str):
        """传入一个文件名 abc.txt 返回该文件是否需要加入宇宙"""
        if "." in nameString:
            endName = name.split(".")[-1].lower()
            if endName == "md" or endName == "pdf":
                if "学习笔记" in name:
                    return True
                if "摘抄" in name:
                    return True
        return False

    # 同时更新json文件
    seriesMap = {}  # {key(系列名): value(md类对象)}
    for root, dirs, files in os.walk(r"D:\学习"):
        for name in files:
            if nameExp(name):
                filePath = root + os.sep + name
                # filePath = r"D:\学习\编程相关\Python\学习笔记\学习笔记Python.md"
                mdf = markdownFile.getInstance(filePath)
                print(mdf)
                if mdf.series in seriesMap:
                    seriesMap[mdf.series].append(mdf.toJsonStr())
                else:
                    seriesMap[mdf.series] = [mdf.toJsonStr()]
                mdf.saveHtmlFile()
    # 更新json文件
    for k, v in seriesMap.items():
        with open(f'website\\json\\{k}.json', "w", encoding='utf-8') as f:
            f.write('[' + ",".join(v) + ']')
        ...


if __name__ == '__main__':
    # test()
    main()
