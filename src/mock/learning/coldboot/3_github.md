## 3 Github 代码托管

![1564987098720f9bb240174ec451595b018c905054ad7.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/V7KMK0lA5ItfWfaYuLVKidaUwDouShkMlFn5A0mk.png)
本次课程，我们来学习程序员的吉祥物 Git 和 Github。通过本次课程，你将学习到：

- 为什么要学习 Git 、Github
- 如何注册 Github 账号
- 如何配置 Github 秘钥
- 如何设置 Github 用户
- 如何创建 Github 仓库
- 如何连接 Github 仓库
- 如何同步 Github 仓库
- 如何克隆 Github 仓库

## Git & Github
在这节课程中，我们一起来学习 Git 和 Github。

- Git 是类似 CSV 或 SVN 的代码版本管理工具（ 工具 ）
- GitHub 是提供的服务能力的代码托管、协助平台 （ 平台 ）

[GitHub](https://github.com/) 是目前全球最大的代码托管平台，许多非常著名的项目都托管在 GitHub 上。开发者们利用 GitHub 来进行团队协作开发，查阅或收藏别人开源项目的优秀代码，进行技术讨论等等。
 
试想一下，如果我们开发过程常见的场景：

- 电脑出现问题了，代码丢失了怎么办？定时用硬盘备份？
- 开发过程中某个地方没想明白，希望请教同事帮忙看看怎么办？压缩拷贝过去 ？

通过 Github 我们可以：

- 把电脑本地的代码同步到 Github ，可以理解为代码云盘，当代码丢了、换电脑了也可以重新下载。
- 通过 Github，同事们也可以方便的查看代码，以及一起同步开发一个项目。

把代码托管到 Github ，方便自己存储管理代码，同时也方便分享和协助。同时，在 Github 上还能开到大牛们优秀的有意思的开源代码，这也是为什么 Git、Github 是程序员必备必学必用的标配。

## 注册 Github 账号
在这节课程中，我们一起来注册 Github 账号。

首先，我们打开 Github 的官网 [https://github.com](https://github.com) ，然后点击 Sign up 进入注册页面，然后按提示进行注册。

重要提示：username 用户名称一定要好好填，总有一天会被人记住的。

⚠️ 注意：注册成功之后请留意邮箱通知，需要进行邮件验证。
 
![156498716443792f56a8915e246229deb69ff1f8153e7 1.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/L7CfA14fT7PgxkESb2JFy8TRrjOEOovdzeNWE82X.png)

## 配置 Github 密钥
在这节课程中，我们一起来配置 Github 密钥。

试想一下我们频繁的对 Github 进行代码的同步托管， Github 怎么知道谁是我呢？肯定有个答案是通过账号密码呀。确实可以，但是我们每次同步都要输账号密码，别忘了我们会频繁的进行同步，后面几次就会发现非常麻烦，并且还会出现忘记和泄漏账号的问题。出于安全与便捷的考虑，推荐使用 SSH Key 来验证。

简单来说，SSH是一种网络协议，用于计算机之间的加密登录。我们可以使用电脑生成一对私钥和公钥，并把公钥防止在 Github 中，当使用 ssh 协议连接 Github 服务时候，会进行钥匙配对，如果配对成功证明拥有权限。
 
> 当然也可以不配置，按提示输入账号密码也是可以的。

接下里我们一起来配置 SSH-key 。

1. 首先我们检查一下自己本机是否拥有密钥。
2. 如果没有生成，我们使用终端生成密钥。
3. 把密钥复制粘贴到 Github Setting SSH 选项中。

**查看公钥**
 
生成 SSH Key，开始之前，我们先使用以下命令来检查主机上是否已经生成过 SSH Key，如果生成过就不需要生成直接使用，打开终端输入。

```bash
cat ~/.ssh/id_rsa.pub
```
 
cat 命令用于打印文件内容，文件存在就会在终端打印出文件内容，不存在则会提示没有这个文件。

例如输入 cat \~/.ssh/id_rsa.pub 命令，如果存在 id_rsa.pub 文件有就出现了 ssh-rsa 开始的一大串秘文，如果我换了一个没有的文件名 demo.pub 则提示没有这个文件。

![15649871981364e27b51d9ed2400b992da38cf3450e7f.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/fMqGk2dmwvS8pgN33vCBvj2S3eCC7p7HhDZ0LbSR.png)

**生成密钥**
如果存在 id_rsa.pub 的话，请跳过生成 SSH 的步骤继续阅读剩下内容。否则使用以下方法来生成 SSH Key，请将 your_email@example.com 替换为你的邮箱，将会在你的 .ssh 目录下生成一对密钥匙， id_rsa 私钥 和  id_rsa.pub 公钥，是配对存在的。

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```
 
命令行会提示让你指定秘钥的名称，按回车键将 SSH Key 保存到默认文件名即可：
 
Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
 
接下来会询问你为 SSH Key 设置密码，按回车键即可，默认为空密码，并确认：
 
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
 
完成之后，再次查看一下公钥，就会发现有内容了。

```bash
cat ~/.ssh/id_rsa.pub
```
 
**添加到 Github 设置**

登录 Github 账号，然后点击右上角用户上的设置，选择 Settings 设置。在设置页中找到 SSH and GPG keys 选项，点击进入。然后选择添加密钥，输入你的电脑名称和把 cat 查看到的公钥内容粘贴进去即可。
 
![1564987312530d7899456099a47508fc134e6f7edd581.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/8MK15fT7KFTEBPqBbh9Ug7bDHjRyYUxivzIuahpx.png)
![15649873324092249ad2ae283490396817999fd8276e2 1.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/wuVlZZjCMAgyusmQOUrGBsePSwpapsCU45R2soTq.png)
![1564987440030715675c071164305872a70cdb3001ce7.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/F0DjHrWi0w5Ow6cPJcTDwaT0EasVgOvcvYvylr2h.png)

## 设置 Github 用户
在这节课程中，我们一起来设置 Github 用户信息。

在第一次使用 Git 和 Github 进程操作时候，我们需要对当前 Git 进行一下个人信息配置，这样可以让提交的时候知道是谁和从哪里提交的，在每次的版本提交上都会带上个人信息。打开 bash 终端，输入命令，按以下事例格式替换为自的账号密码，即可设置用户名和邮箱。

```bash
git config --global user.name "Your Name"
git config --global user.email "your@example.com"
```

## 创建 Github 仓库
在这节课程中，我们一起来学习创建 Github 仓库。

具体操作如下：

1. 点击个人头像，选择我的仓库，即可进入我的仓库列表页面。（ 也可以从其他快捷入口进去）
2. 然后点击 New 创建仓库，输入仓库名称和描述点击创建。
3. 注意：不要勾选 Initialize this repository with a README ( 自动创建一个 README 文件 ）

新的空仓库创建完成，由于是空的仓库，Github 会提示我们如何给仓库连接或填充，分别举了使用客户端、命令行、远程仓库三个例子，在接下来我们会在本地使用命令行工具和空仓库连接并同步代码。
 
![15649873935484bedda731a7b417c8c13a52a95be2127 1.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/qRpZKbZ1fAPvd6zqLbbWvGrvohoytrK1YkOB97pU.png)
![15649874195652b464c249f034e6086a98ba25c057cef.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/AmBT6IagTI6p8l2CTHFW4hDM0AJVupvufCBZs3MC.png)
![1564987440030715675c071164305872a70cdb3001ce7.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/BuNY2RZscWjE4VA9FX2tTkdwVNGNh5jIAmQCDKVz.png)

## 连接 Github 仓库
在这节课程中，我们一起来学习连接 Github 仓库的代码。我们本地的代码在电脑本身，创建的仓库在 Github 网站上（云盘），如果把他们连接起来呢 ？修改了之后，他们怎么保持同步呢？记住一下关键的几个步骤即可。

1. 初始化和设置仓库源地址（ 初始化和设置源地址只要开始时候设置一次即可）
2. add、commit、push 添加、打标、推送 三部曲。
3. 注意：第一次 push 推送，在后面添加  -u origin master 推送并创建 master 分支。

接下里，我们来尝试下通过命令行把本地的文件夹和 Github 刚刚创建的仓库连接同步。在仓库中其实也有个提示的例子，接下来我们一起来实现一下。

1. 创建文件夹、文件
2. 使用 cd 命令进入文件夹
3. 使用 git init 命令初始化项目
4. 使用 git remote 命令设置仓库源地址
5. 使用 git add 命令，把要推送的文件上膛。
6. 使用 git commit 命令，把要推送的文件标上信息。
7. 使用git push 命令，把文件推送到 Github 源地址。（ 注意：由于远程仓库是空仓库，首次推送要加 -u orgin master 后缀，推送并创建 master 分支）

![156498746161829103196242441e8ac20247b4945fc80.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/gFP9KRb50SG7bhBsoFo0HeKs6O4lF4Y8aQfKglWP.png)

### 创建文件夹、文件

首先我们在桌面创建一个名为 firsthub 的文件夹，并使用编辑器在里面创建一个 helloword.md 文本文件，并在里面编辑写上 helloworld 并保存。这个firshhub 文件夹就是我们即将要和仓库同步，里面的 helloword.md 也即将被推上线上仓库之中。

也可以使用终端命令，cd 到 Desktop ，然后使用 mkdir firsthub 命令创建文件夹，再 cd firsthub 命令进入到文件夹中，使用 touch helloword.md 命令创建 Markdown 文件。

> md 后缀文件为 Markdwon 文件，是一种「标记语言」，常用于编写代码文档。

![1564987501731d61ad7213785434f8a647981e056e771.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/OyCKN6XxQGaDXKuWpXuyeENzVuNT57rELNjfDrxj.png)

### Git init 初始化项目

打开 bash 终端，使用 cd 进入 firsthub 文件夹，记得 pwd 一下查看当前位置是否正确。
 
![15649875275114cc0648a02e248b8ae7edac7c9679da6.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/jtjnrKgdofRIgmxgoGqdJ5hXnxmGJXuXNan7nC6F.png)
 
使用 git init 命令把当前的文件夹初始化为一个 Git 仓库。
 
![1564987546180c2155ec76a174417aded7fa7a3c01339.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/XPt44NG1jte6RD9C95lun8gV6qawUaLIx0Jp7F5v.png)

### Git remote 设置仓库源地址

使用 git remote add origin < 地址 > 为当前 Git 仓库制定我们的远程仓库地址，地址可以在我们新建的仓库中看到，我们可以直接从仓库地址中的提示拷贝过来粘贴执行。

⚠️注意：查看仓库<地址>是 git 还是 https 开头，如果是 https 开头那么一般是没有配置 SSH-key，连接之后如果需要输入账号密码进行验证。如果是 git 开头，证明是 ssh 协议，之后在本机不需要输入账号密码进行验证。可以通过仓库上方 https、SSH 来切换仓库的提示。（ 如果没有配置 SSH-key 的情况下使用 git 开头的 ssh 协议地址，那么最后会提示没有权限 ）
 
![15649875676239eeb2b6bd48e4c20b8cb9826262aeede.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/UGWQPbUJ3gkxXcyYuCNrgYwbbKe17BwlrtPRwg6A.png)

### Git add 添加文件到暂存区

使用 git add < 文件名 > 命令把我们需要同步的文件放到暂存区，添加文件名可以制定同步哪些修改后的文件，当然我们可以使用点( . )来表示同步当前文件夹下发生变动的所有文件。接下里来我们使用 git add . 来把发生变动的 helloword.md 文件夹放到暂存区。
 
![1564987585596100ad291ab924d39b13a4c5f72e43721.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/tpvr6fXBENXeKuZ0d3hRdiwrb4yzXhO9jPMLbJ28.png)


### Git commit 添加文件到版本库并附上描述文件

使用 git commit -m "< 描述 >"  把缓存区中发生变动的文件放到版本库中，并未该版本附上描述信息。接下来我们在命令行输入 git commit -m "my first submit" 代表我的第一次提交。然后就会提示我们此次版本多少个文件发生了修改。
 
![156498760606856d46456cb63458198f3a14dcb25d6f0.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/efSr6N3eFgd4WwQkOiLztWemA2gzRcpgzlEvexrO.png)
 
### Git push 把本地版本提交到线上仓库

使用 git push 命令把本地版本提交到线上仓库，由于我们线上是一个空的仓库，所以在本次首次提交中，我们需要在提交的同时创建分支，可以使用提示的命令 git push -u origin master。提交完毕后，我们可以刷新一下 Github 仓库页面，将会发现我们的 hellowrold.md 文件已经同步过来了。之后的提交都不需要添加 -u origin maste 后缀，直接 git push 即可。
 
![1564987657742e75971e50c0a4405908509680bb2272d.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/UqjHkC35IxuikgS64oRmAx8yR3mdVZPqO7cklhBo.png)

## 同步 Github 仓库
在这节课程中，我们一起来同步本地修改了的代码到 Github 仓库。

再上小节课中，我们已经把本地代码和远程仓库参赛了连接，如果我们本地的代码再次发生改变，远程仓库会自动的同步吗？当然不会，我们需要再次手动的把代码放到暂存区，然后为版本库打标，再推上去远程仓库同步。其实就是依次执行 add 、commit 、push 的命令，类似于上子弹、打标记、发射三个步骤。

接下来我们尝试一下：

1. 在编辑器中修改一下 helloworld.md ，在下面再加一行 world peace 
2. 接着在命令行中使用 add、commit、push 三部曲即可
3. 最后我们再次刷新一下仓库，点进去文件看看，如果内容更新那么我们的修改就同步成功了。

提示： 使用前记得确定命令行位置在当前 firshhub 目录下 ，可以使用 pwd 查看当前目录位置。
 
![1564987748855b0f6b75495e044c5bdc7becfa6973d8e.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/5sgwlbWMBq0KrXZpe75ywIWSZKWbZrll9ybC0qiJ.png)

## 克隆 Github 代码
在这节课程中，我们一起来学习克隆 Github 仓库到本地。

我们把代码托管到 Github 上，如果本地代码丢掉了，我们也可以在需要的时候把代码克隆到本地，同时也方便同事去拉取你的代码。我们可以通过 git clone < 地址 > 来把线上 Github 仓库的代码克隆到本地。

接下来我们一起尝试下 clone 线上代码

1. 首先我把桌面的 firsthub 文件夹删除掉，这样我的桌面就没有了之前的代码了。
2. 打开 Github 仓库，选择 clone 的地址（ 有 Https 以及 SSH 类型）
3. 打开终端 cd 到代码放置的文件夹，我们可以 cd ~/Desktop 到桌面
4. 使用 git clone 命令 clone 线上代码

![1564987969498bb4fa227b4be417c85e4cd38b7f2e27c.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/zysN6d9FHeqXrAQmclydjBK8WZPxm1hBIiRNAgqH.png)
 
接着我们打开 Github 仓库查看仓库地址，因为我们配置了 SSH-KEY 所以可以选择 SSH 地址，如果没有配置选择切换 HTTPS 地址，复制里面的地址。
 
![1564987990919a1d3bec7d8d74127aef9d9c1ee3a10e9.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/OFiiHyMwNUtwds23xtXLdJo9jxOy1gB8qaEB4hz8.png)
 
打开 bash 终端，cd 进入到桌面，然后运行 git clone  <地址> 就可以发现我们的桌面又重新多了 firsthub 文件夹了。如果我们继续想修改同步，参考之前的修改方式进行 add、commit、push 即可。
 
![156498801198417565ac6152f499fbd5eedd010d919ea.png](https://vip-assets.jiker.com/_for_plus_sub_project/2020/0827/admin/fep09FFtcAbbJdJ4tir3QkwInBB2795Qk1MJTaf1.png)

## 小结与作业
通过这次课程我们应该对 Github 和 Git 操作有了一定的了解 ，包括：

-  Git 、Github 的基本概念
- 注册 Github 账号
- 配置 Github 秘钥
- 设置 Github 用户
- 创建 Github 仓库
- 连接 Github 仓库
- 同步 Github 仓库
- 克隆 Github 仓库

其实总结起来就创建仓库，同步修改这样。刚刚开始需要配置 ssh-key 和 git config 的信息，第一次同步的时候我们要注意 init 和 remote add ，之后我们就会频繁的用到 add 、commit 、push 了。

最后，建议把 Github 的仓库和本地的文件都删除，重复多练习 5 次，达到熟练的状态，不然容易忘记。

加油 ～
