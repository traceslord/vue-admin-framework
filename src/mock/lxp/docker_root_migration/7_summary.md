在生产环境中，经常有用户因为磁盘空间不足，修改docker root目录，这是一个重要且敏感的项目，因此每个运维人员都需要掌握docker root 迁移方法。通过此项目的完成，我们掌握了如下新技能：

1. 学习docker root工作机制；
2. 掌握dockerd、containerd与containerd-shim之间的通信机制；
3. 实现一个docker root迁移脚本。
