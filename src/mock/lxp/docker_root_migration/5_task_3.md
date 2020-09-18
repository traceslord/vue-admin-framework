从Docker 1.11开始，Docker容器运行已经不是简单的通过Docker daemon来启动，而是集成了containerd、runC等多个组件。Docker服务启动之后，我们也可以看见系统上启动了dockerd、docker-containerd等进程，本文主要介绍新版Docker（1.11以后）每个部分的功能和作用。

**任务要求：**
1. 掌握dockerd核心概念；
2. 掌握containerd与containerd-shim之间的通信机制；

**任务提示：**

**1. 掌握dockerd核心概念：**

- 首先我们来看一下dockerd的官方解释：

dockerd is the persistent process that manages containers. Docker uses different binaries for the daemon and client. To run the daemon you type dockerd.

通俗的讲：用于管理容器的守护进程，叫dockerd，docker是可以分为服务端和客户端的。即有host和client，dockerd可以理解为docker的引擎，来直接控制docker 的daemon的行为。

1. dockerd是docker后台的真正的进程。docker只是命令行工具。

2. 当dockerd未启动时，docker是可以使用，但是执行build等一些命令时就会发现找不到daemon。

3. dockerd 是docker daemon，类似server，docker client是一个客户端命令行，类似aws的客户端工具一样。client可以连接远程的docker daemon进行操作。也就是说，安装docker有两种，一种是安装docker daemon，即叫docker，里面涵盖了docker 

- Docker 1.11开始，守护进程启动命令变成了：

dockerd

此时已经和Docker client分离，独立成一个二进制程序了。

当然，守护进程模块不停的在重构，其基本功能和定位没有变化。和一般的CS架构系统一样，守护进程负责和Docker client交互，并管理Docker镜像、容器。

**2. 掌握containerd与containerd-shim之间的通信机制：**

![image.png](https://assets.jiker.com/_for_plus_sub_project/2020/0901/admin/DC8fngy4KLalanocmji1SPF513l06O8eklnMU8ql.png)

- containerd
	
containerd是容器技术标准化之后的产物，为了能够兼容OCI标准，将容器运行时及其管理功能从Docker Daemon剥离。理论上，即使不运行dockerd，也能够直接通过containerd来管理容器。（当然，containerd本身也只是一个守护进程，容器的实际运行时由后面介绍的runC控制。）

![image.png](https://assets.jiker.com/_for_plus_sub_project/2020/0901/admin/QCpeVixbqXo5UXC8P6W38pty1AsoR4O6yQA4rMoQ.png)

containerd向上为Docker Daemon提供了gRPC接口，使得Docker Daemon屏蔽下面的结构变化，确保原有接口向下兼容。向下通过containerd-shim结合runC，使得引擎可以独立升级，避免之前Docker Daemon升级会导致所有容器不可用的问题。

当Docker daemon启动之后，dockerd和docker-containerd进程一直存在。当启动容器之后，docker-containerd进程（也是这里介绍的containerd组件）会创建docker-containerd-shim进程。

- containerd-shim

docker-shim是一个真实运行的容器的真实垫片载体，每启动一个容器都会起一个新的docker-shim的一个进程，他直接通过指定的三个参数：容器id，boundle目录（containerd的对应某个容器生成的目录，一般位于：/var/run/docker/libcontainerd/containerID），运行是二进制（默认为runc）来调用runc的api创建一个容器（比如创建容器：最后拼装的命令如下：runc create 。。。。。）
