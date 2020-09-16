## 1  Linux 命令操作

![1594981729252b486b928dad84c708bc4780931b045b0.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/Je4RTcYLZ2IWrgyz1ySnbaA1WEJ0lSLjS7JmmOPk.png)

本次课程，我们来学习一下计算机中的 Linux 常用的命令操作。通过本次课程，你将学习到：

- 为什么要学习 Linux 命令
- 什么是绝对路径和相对路径
- 如何切换目录与查看文件
- 如何创建文件夹、文件

## 为什么要学习 Linux 命令
在这节课程中，我们一起来了解下编程中为什么要学习 Linux 命令。

我们日常使用的计算机系统主要有 windows 、macOS、Linux 。由于它们之间内核有点不一样，window 系统的内核是 DOS，而 macOS、Linux 的内核是 UNIX，所以他们的命令行工具和命令都会有所差异，分为 CMD 和 bash（ 最新的 macOS 目前使用 zsh ，可以立即为 bash 的升级版 ） 。

个人电脑使用的系统为 windows、macOS 居多，但是在服务器上普遍使用的是 Linux 系统。因此在开发者中，掌握 Linux 系统中操作命令是很有必要的。为了让各系统操作命令的统一，使用 windows 系统的同学需要下载一个 Git Bash 的工具，Git Bash 会对 CMD 的命令进行封装，让其也可以使用 bash 相关的命令。 日常中我们都是使用图形化操作系统居多，直接点击拖拉就可以操作文件，接下来我们就要使用命令来操作一把了。在接下来的开发中，我们都会频繁的使用到系统命令，命令行操作习惯了能大大提升开发效率。

使用 windows 系统的的同学麻烦先下载 Git bash （ macOS 的同学不需要下载，终端自带）。百度 Git ，或者直接打开 Git 官网 [https://git-scm.com/](https://git-scm.com/)，点击 Download 下载即可网页会更具你的电脑系统推荐你下载哪个版本，直接按就行。  ![1564986375388dfd2f2597af54da89161fab9b8d5ecd1.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/BvuvT3OjRHQ7YaC2e5ppfg4v8nwMzcJ5Q1Wfmq14.png) 下载好了安装包，点击安装，然后不断的下一步使用默认设置好的配置即可。（装到 C 盘也是没问题的 ） winodws 用户安装完毕之后，我们可以在系统的文档位置使用右键打开，建议把配置放在底部的导航栏方便直接使用。

mac 用户在应用中打开终端使用即可。  
![1564986375429a9b503cd02d04867826ebfa3f617dc34.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/5DJ6qDPcUwBxRU1yVNsn1KKdFUJLcZosnvZw6JZa.png)


## 绝对路径和相对路径
在这节课程中，我们一起来学习绝对路径和相对路径。

路径代表一个文件在计算机上面的地址。绝对路径好比我们的邮递快递填写的地址一样，需要写明白省市区小区和单元，这样快递员才可以准确投递到。相对地址好比我们都是同一个小区你，相对与你的下下楼邻居的位置可以是楼上楼下几层来定位更具直接。


- 绝对路径：北京市海淀区知春路27号1707
- 相对路径：楼上 7 单元

在计算机的表示中也类似这样：

- 绝对路径：/User/zhuhuayu/Desktop/test/hello.js
- 相对路径：test/hello.js ( 当前在 Desktop 目录 ）
- 相对路径：../test/hello.js （ 当前在 Desktop/tmp/ 目录中，../ 表示相对自身当前的上一级目录 ）

接下来我们理解两个特殊的路径，分别为根目录和用户目录。

1. 根目录 / ，在 window 根目录上一般有 c 盘、d 盘、e 盘，在 mac 根目录上一般有 Applications 应用目录、Users 用户目录等等 。

2. 用户目录 ～ ，无论是 windos、mac 系统用户目录都存放于当前用户相关的文件，例如该用户特有的 桌面、文档、图片 等等。不过 window 和 mac 的用户目录的路径会不一样，因为 mac 没有 c 盘、d 盘的概念，window 的用户目录会在 c 盘 的 users 目录下的当前 username 目录，而 mac 会在更目录下的 users 目录的 <username> 目录。


## 切换目录与查看文件
在这节课程中，我们一起来学习如何在命令中切换目录和查看当前目录下的文件。

首先学习 3 个命令，分别为 pwd 、cd 、ls 。

- pwd ，是 Print Working Directory 的缩写，用于显示当前路径。
- cd，是  Change Directory 的缩写，用于切换文件夹。
- ls ，是 list 的缩写，用于列举目录内容。

 接下来我们打开 bash 终端，在终端中输入 pwd 查看当前位置。无论是 windows 用户或者 mac 用户我们都可以发现直接打开 bash 终端我们的位置是在 用户目录上。另外一种情况，windows 用户如果有使用右键的 git bash 快捷打开终端的话，会直接进入当前的所在的目录地址，例如你在桌面右键的，就会所在桌面。

我们来进行一下操作：

1. 打开终端（ 打开 Git bash ）
2. 使用 pwd 命令确定一下我们当前的位置 （ 如果直接通过软件打开会在用户目录 ～ ，如果在桌面使用 Git bash 打开的话会在桌面目录 ~/Desktop )
3. 使用 cd /命令进入到根目录 （ 注意加空格： cd + 空格 + / ）
5. 使用 ls 命令看看根目录中什么文件夹
6. 使用 cd ～ 进入用户目录 
7. 使用 ls 看看又有什么文件（ 这时候你会发现又 Desktop 桌面目录的）
8. 使用 cd Desktop 相对路径命令进入到桌面目录，然后 pwd 一下看看又什么文件 ）
9. 使用 cd ../ 使用绝对路径命令，我们可以再回到上一级的目录之中，也就是用户目录）

![1594980639793b6a65b11c0da4533888c7e4d4618cbbc.gif](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/aakf3wY1ZzE6gui5bLOLhgcLk64T9rNvIMQNKhiw.gif)

## 创建文件夹、文件
在这节课程中，我们一起来学习如何在命令中创建文件夹和文件。

首先学习 2 个命令，分别为 mkdir、touch 。

- mkdir ，是 Make Directory  的缩写，用于创建目录。
- touch ，用于创建文件。

接下来我们操作一下，通过命令行在桌面创建 1 个文件夹为 Project ，以及在 Project 中创建 test.txt 文件。

1. 打开终端（ 打开 Git bash ）
2. 使用 pwd 查看当前目录（ 看看自己在用户目录，还是桌面  Desktop ，或者在其他的地方）
3. 如果在用户目录，使用 cd Desktop 进入桌面（ 如果直接在桌面不需要进行任何操作）
4. 使用 ls 查看当前桌面有什么文件
5. 使用 mkdir Project 创建 Project 文件夹
6. 使用 ls 查看一下当前桌面文件的变化（这时候会发现多了 Project 文件 ）
7. 使用 cd Project 进入 Project 文件夹中
8. 使用 touch test.txt 创建 test 文件。

最后可以通过电脑的可视化窗口检验下，看看桌面是否创建了  Project 文件夹，点击进去看是否有 test 文件。

![1594981107868e864497ee18340e39909fecb83b78688.gif](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/SdF5d8UsFBWWtHR2WKIVYA0ccCqGlGtdxuGYQu2o.gif)

## 小结与作业
通过本次课程，对系统中的命令和命令的使用有一定的了解 ，包括：

- 为什么要学习 Linux 命令
- 什么是绝对路径和相对路径
- 如何切换目录与查看文件
- 如何创建文件夹、文件

当然很多同学会觉得记住这些命令太麻烦了，还是可视化直接，那当然可视化就是为了我们可以更方便的使用。但命令的使用，在一些没有可视化的系统上，还有使用代码脚本操作文件系统还是有必要的。

我们学习到的命令有 pwd、ls、cd、mkdir、touch，其中重点我们要熟练的有 pwd、ls 、cd ，知道自己在哪里，可以去哪里，加油 ～

接下里我们来完成一个课后小作业，在用户目录中创建一个 projects 文件夹，用于存放之后我们编程中学习的代码。

1. 打开命令工具（ 终端 or Git bash ）
2. 使用 pwd 查看当前地址（ 如果不在用户目录，使用 cd ～ 进入到用户目录）
3. 使用 mkdir Projects 创建 Projects 文件夹。
