# -*- encoding: utf-8 -*-
"""
md -> html
2021年08月06日
by littlefean
"""
# -*- coding: utf-8 -*
__author__ = 'geebos'

import re
import markdown
from pygments import highlight
from pygments.token import Text, STANDARD_TYPES
from pygments.formatter import Formatter
from pygments.lexers import get_lexer_by_name
from pygments.lexers import guess_lexer
from pygments.util import ClassNotFound


def main():
    ...


def _get_ttype_class(tType):
    fName = STANDARD_TYPES.get(tType)
    if fName:
        return fName
    aName = ''
    while fName is None:
        aName = '-' + tType[-1] + aName
        tType = tType.parent
        fName = STANDARD_TYPES.get(tType)
    return fName + aName


def _line_num_tag_gen():
    line_num = 0

    def result():
        nonlocal line_num
        line_num += 1
        return f'<div class="line-numbers"><div class="line-num" data-line-num="{line_num}"></div></div>'

    return result


class HtmlLiFormatter(Formatter):
    def __init__(self, **options):
        Formatter.__init__(self, **options)

    @staticmethod
    def _get_css_class(ttype):
        """Return the css class of this token type prefixed with
        the classprefix option."""
        ttypeclass = _get_ttype_class(ttype)
        if ttypeclass:
            return ttypeclass
        return ''

    @staticmethod
    def html_encode(value):
        if '<' in value:
            value = value.replace('<', '&lt;')
        if '>' in value:
            value = value.replace('>', '&gt;')
        return value

    def _get_css_classes(self, ttype):
        """Return the css classes of this token type prefixed with
        the classprefix option."""
        cls = self._get_css_class(ttype)
        while ttype not in STANDARD_TYPES:
            ttype = ttype.parent
            cls = self._get_css_class(ttype) + ' ' + cls
        return cls

    def format(self, tokensource, outfile):
        get_line_num_tag = _line_num_tag_gen()
        line_start_tag = '<li class="line">'
        line_end_tag = '</li>'

        code_tags = ['<ol class="code-container">']
        num_tags = ['<ol class="num-container">']

        line_value = ''

        outfile.write('<div class="code">')

        # 预处理
        temp_tokensource = []
        for ttype, value in tokensource:
            value = value.replace(' ', '&nbsp;')
            if ttype == Text and '\n' in value:
                values = re.findall(pattern='([^\n]*)(\n)([^\n]*)', string=value)

                for i in values:
                    for k in i:
                        if k != '':
                            temp_tokensource.append((ttype, k))
            else:
                temp_tokensource.append((ttype, value))

        for ttype, value in temp_tokensource:
            ttype_class = self._get_css_classes(ttype)

            value = self.html_encode(value)

            if value != '\n':
                line_value += f'<span class="{ttype_class}">{value}</span>'
            else:
                num_tags.append(get_line_num_tag())
                code_tags.append(
                    f'{line_start_tag}<div class="highlight-code"><div class="code-line">{line_value}</div></div>{line_end_tag}\n')

                line_value = ''
        num_tags.append('</ol>')
        code_tags.append('</ol>')

        outfile.write(f'{"".join(num_tags)}{"".join(code_tags)}')
        outfile.write('</div>\n')


def code_to_html(match):
    type_and_content = re.findall(pattern='```(\w*)[\n|\r]([^`]+)```', string=match.group(0))
    formatter = HtmlLiFormatter(linenos=True, style='colorful')

    try:
        code_type = type_and_content[0][0]
    except IndexError:
        print("解析代码块代码类型索引出错，按没有代码类型，没有高亮处理")
        code_type = ""

    try:
        code_content = type_and_content[0][1]
    except IndexError:
        print("解析代码块内容出错，按没有代码处理，里面的代码没了！")
        code_content = "解析代码块内容出错，按没有代码处理，里面的代码没了！"

    if code_type != '':
        # print(code_type)
        try:
            substring = highlight(code=code_content, lexer=get_lexer_by_name(code_type), formatter=formatter)
        except ClassNotFound:
            # 没有找到这种代码类型的高亮显示
            print("没有找到这种代码的高亮显示，默认按没有类型执行", code_type)
            substring = highlight(code=code_content, lexer=guess_lexer(code_content), formatter=formatter)
    else:
        substring = highlight(code=code_content, lexer=guess_lexer(code_content), formatter=formatter)

    return substring


def md_to_html(mdStr):
    sub_string = re.sub(pattern='```([^`]+)```', repl=code_to_html, string=mdStr)

    exts = ['markdown.extensions.extra', 'markdown.extensions.tables']
    try:
        html = markdown.markdown(sub_string, extensions=exts)
    except AttributeError:
        print("笔记内容解析出现错误", )
        html = "笔记内容解析出现错误，如果你就是想看，可以将以下内容复制到markdown文档看，或者联系站长"
        html += "</br></br>" + f"<pre>{mdStr}</pre>"
    return html


if __name__ == '__main__':
    main()
