pathArr = ['D:', '学习', '编程相关', '微信小程序', '学习笔记 微信小程序.md']

finalArr = []
start = False
for i in range(len(pathArr)):
    if i == len(pathArr) - 1:
        break
    if pathArr[i] == "学习":
        start = True
    if start:
        finalArr.append(pathArr[i])

print("-".join(finalArr))
