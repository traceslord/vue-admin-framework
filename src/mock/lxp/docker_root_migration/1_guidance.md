### 1.1 - 项目介绍   

在生产环境中，经常有用户因为磁盘空间不足，修改docker root目录，但是，用户的操作很暴力，直接修改配置文件和重启服务，导致存量容器无法被彻底删除，pod长期处于termineting状态，最终影响在线业务。该项目实践将实现如何规范的完成docker root迁移。

### 1.2 - 教学目标 

1. 学习docker root工作机制；
2. 掌握dockerd、containerd与containerd-shim之间的通信机制；
3. 实现一个docker root迁移脚本；

|教学目标|需要配合的任务|	达成方式| 
|-|-|-|
|学习docker root工作机制|任务1：了解docker root工作机制。	|完成任务，提供配套作业的正确答案
|掌握dockerd、containerd与containerd-shim之间的通信机制|	任务2：掌握dockerd、containerd与containerd-shim之间的通信机制|	完成任务，提供配套作业的正确答案|
|实现一个docker root迁移脚本|	任务3：实现docker root迁移脚本|	完成任务，提供配套作业的正确答案|

### 1.3 - 前置技能

在学习本项目之前需要掌握的技能, 以顺序罗列

1. 熟悉 docker 架构
2. 熟悉 Kubernetes 架构
3. 具备 shell 编写能力

### 1.4 - 学习周期

|总时长	|任务1	|任务2	|任务3|
|-|-|-|-|
| 4H	|1H	| 1H|	 2H|

### 1.5 - 配套资料

**参考文档:**

[https://blog.csdn.net/JaneNancy/article/details/81904931](https://blog.csdn.net/JaneNancy/article/details/81904931)

[https://outmanzzq.github.io/2019/11/01/migrate-docker-container-storage-location/](https://outmanzzq.github.io/2019/11/01/migrate-docker-container-storage-location/)

[https://taohuawu.club/migrate-docker-installation-directory](https://taohuawu.club/migrate-docker-installation-directory)

系统环境：宿主机操作系统Windows 10

虚拟机开发环境： CentOS7.4

IP地址：192.168.80.131，网卡模式为NAT

浏览器：火狐浏览器等
