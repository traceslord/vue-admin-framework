在前面两个小节里面，我们学到了docker root的原理，dockerd、containerd与containerd-shim之间的通信机制，在本小节我们来实际迁移docker root目录。

**任务要求：**

1. 实现docker root迁移脚本；

**任务提示：**

docker 默认数据目录 Docker Root Dir 是 /var/lib/docker

可通过 #docker info命令查看Docker Root Dir值核实

**1. 前置工作：**

下文以 /store/software/docker 这个路径作为要迁移的新 Docker 安装(存储)目录
在开始迁移之前，首先复制原 Docker 安装(存储)目录到新的路径下：

- cp -a /var/lib/docker /store/software/

然后备份原目录数据：

- mv -u /var/lib/docker /var/lib/docker.bak

**2. 迁移方法一：软链接**

- 通过把 Docker 的原安装(存储)目录移动到自定义的其他路径下，然后在原位置下建立软链接是最简单快捷的方式。

- （1）关停 Docker 服务：

        sudo systemctl stop docker

        #or

        sudo service docker stop

- （2）新建一个 /var/lib/docker 的软链：

        sudo ln -fs /store/software/docker /var/lib/docker
 
- （3）重启 Docker 服务：

        sudo systemctl start docker

        #or

        sudo service docker start

启动 Docker 之后，以后你 pull image 和 run container，Docker 写入的路径依然是 /var/lib/docker ，但是因为软链的设置，实际已经是往新的目录写入了。至此，完成了 Docker 安装(存储)目录的迁移。

**3. 迁移方法二：软链接**
- Docker 版本 >= v17.05.0
	
因为 Docker 官方在这个发行版本就 deprecated 了 graph 这个 feature，所以如果你机器上安装的 Docker 版本 >= v17.05.0，则无法通过在 /etc/default/docker 配置文件中指定 graph 参数来修改 Docker 的默认安装(存储)目录了，具体参见官网文档：Docker Docs。

好在天无绝人之路，新版本的 Docker 还有其他方式可以达到我们修改安装(存储)目录的目的：通过修改(新建) /etc/docker/daemon.json ，指定 data-root 参数的值。

按如下操作：

- （1）修改daemon.json文件
- vim /etc/docker/daemon.json

加入

        {
          "data-root": "/store/software/docker",
          "storage-driver": "overlay2" # 这个是 Docker 是默认设置，这里也可以不用加
        }

- （2）重启 Docker & 清理原安装(存储)目录
- （3）重启 Docker 服务：
 
        sudo systemctl restart docker
        #or
        sudo service docker restart

通过上述任一方法完成迁移之后，在确认 Docker 能正常工作之后，删除备份的原目录数据：

rm -rf /var/lib/docker.bak
