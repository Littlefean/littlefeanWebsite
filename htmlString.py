# -*- encoding: utf-8 -*-
"""
PyCharm htmlString
2021年11月24日
by littlefean
"""
TITLE = "个人学习小站"
NAV = f"""<nav>
                <div class="title">
                    <h1>{TITLE}</h1>
                    <p>岳同学的学习网站</p>
                </div>
                <ul>
                    <li><a href="../../index.html">首页</a></li>
                    <li><a href="../../history/historySingleLine.html">历史</a></li>
                    <li><a href="../../htmlMy/howWork.html">关于</a></li>
                    <li><a href="">友情连接</a></li>
                </ul>
            </nav>"""
NAV_ = f"""<nav>
                <div class="title">
                    <h1>{TITLE}</h1>
                    <p>岳同学的学习网站</p>
                </div>
                <ul>
                    <li><a href="../index.html">首页</a></li>
                    <li><a href="../history/historySingleLine.html">历史</a></li>
                    <li><a href="../htmlMy/howWork.html">关于</a></li>
                    <li><a href="">友情连接</a></li>
                </ul>
            </nav>"""
FRIENDS = """
            <li><a href="http://coder.cwp.cool/">蔡蔡的个人网站</a></li>
            <li><a href="http://litchi.3vzhuji.net/">凉拌荔枝的个人网站</a></li>
            <li><a href="http://oys68.cn">欧阳松的个人网站</a></li>
            <li><a href="http://zjcdlp54.cn">吕怡婷的个人网站</a></li>"""

beiAnNumber = "冀ICP备2022004336号"

FOOTER = f"""<footer class="mainFooter">
    <ul class="topUl">
        <li><a href="../../index.html">首页</a></li>
        <li><a href="#">其他作品</a></li>
        <li><a href="../../htmlMy/howWork.html">网站说明</a></li>
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
                    <td><img src="../../image/footerIcon/哔哩哔哩.png" alt=""></td>
                    <td><a href="https://space.bilibili.com/480804525">阿-岳同学</a></td>
                </tr>
                <tr>
                    <td>知乎</td>
                    <td><img src="../../image/footerIcon/知乎.png" alt=""></td>
                    <td><a href="https://www.zhihu.com/people/lan-xi-36-22">诗云</a></td>
                </tr>
                <tr>
                    <td>简书</td>
                    <td><img src="../../image/footerIcon/简书.jpg" alt=""></td>
                    <td><a href="https://www.jianshu.com/u/b69af9df5272">littlefean</a></td>
                </tr>
                <tr>
                    <td>CSDN</td>
                    <td><img src="../../image/footerIcon/csdn.jpg" alt=""></td>
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
    <p class="sub">
        若有内容侵权，可以联系QQ:2385190373 或者 2385190373@qq.com 我会进行删除处理&nbsp;
        <a href="https://beian.miit.gov.cn" id="beiAnId">冀ICP备2022004336号</a>
    </p>
</footer>"""

PDFString = """<h1>该笔记为pdf类型笔记</h1>
<h4>文件较大，加载可能需要一定时间</h4>
"""