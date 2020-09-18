建议⾄少4台服务器或者虚拟机，每台服务器4G内存，2个CPU核⼼以上，基本架构为1台master节点，3台 slave节点。整个安装过程将在Ubuntu服务器上安装完kubeadm，以及安装kubernetes的基本集群，包括canal⽹络。
|⻆⾊|主机名|IP地址|
|-|-|-|
|Master|Ubuntu-master|192.168.5.200|
|Slave|ubuntu-1|192.168.5.201|
|Slave|ubuntu-2|192.168.5.202|
|Slave|ubuntu-3|192.168.5.203|

**配置主机名映射，每个节点**

#cat /etc/hosts

127.0.0.1 localhost

192.168.0.200 Ubuntu-master

192.168.0.201 Ubuntu-1

192.168.0.202 Ubuntu-2

192.168.0.203 Ubuntu-3

**在所有节点上安装kubeadm**

**查看apt安装源如下配置，使⽤阿⾥云的系统和kubernetes的源**

#cat /etc/apt/sources.list

**#系统安装源**

deb	http://mirrors.aliyun.com/ubuntu/	xenial	main	restricted
 
deb	http://mirrors.aliyun.com/ubuntu/	xenial-updates	main
	restricted 

deb	http://mirrors.aliyun.com/ubuntu/	xenial	universe 

deb	http://mirrors.aliyun.com/ubuntu/	xenial-updates	universe 

deb	http://mirrors.aliyun.com/ubuntu/	xenial	multiverse 

deb	http://mirrors.aliyun.com/ubuntu/	xenial-updates	multiverse 

deb	http://mirrors.aliyun.com/ubuntu/	xenial-backports	main	restricted	universe	multiverse

**#kubeadm及kubernetes组件安装源**

deb	https://mirrors.aliyun.com/kubernetes/apt   kubernetes-xenial	main

**安装docker，可以使⽤系统源的的docker.io软件包**

#apt-get install docker.io 

Reading	package	lists...	Done 

Building	dependency	tree	

Reading	state	information...	Done 

docker.io	is already the	newest	version	(1.13.1-0ubuntu1~16.04.2). 0	
upgraded,0 newly	installed,	0 to	remove	and	4 not upgraded.

**更新源，可以不理会gpg的报错信息。**

#apt-get update 

**强制安装kubeadm，kubectl，kubelet软件包**

#apt-get	install	-y	kubelet	kubeadm	kubectl	--allow-unauthenticated kubeadm

**安装完以后，使⽤kubeadm来快速安装部署Kubernetes集群。**

**使⽤kubeadmin初始化master节点**

kubeadm	init	--pod-network-cidr=10.244.0.0/16	--apiserver-advertise-address=192.168.0.200

**slave节点加⼊集群**

#kubeadm join 192.168.0.200:6443 --token	rw4enn.mvk547juq7qi2b5f	--discovery-token-ca-cert-hash	sha256:ba260d5191213382a80 6a9a7d92c9e6bb09061847c7914b1ac584d0c69471579

#kubectl	get node

|NAME|STATU|ROLES|AGE|VERSION|
|-|-|-|-|-|
|ubuntu-1|NotReady|<none>|6m|v1.10.1|
|ubuntu-2|NotReady|<none>|6m|v1.10.1|
|ubuntu-3|NotReady|<none>|6m|v1.10.1|
|ubuntu-master|NotReady|master|10m|v1.10.1|

在master节点查看信息如下状态为节点加⼊完毕。

kubectl get pod -n	kube-system -o wide

**安装⽹络插件canal**

#kubectl apply -f https://docs.projectcalico.org/v3.0/getting-started/kubernetes/installation/hosted/canal/rbac.yaml

#kubectl	apply –f https://docs.projectcalico.org/v3.0/getting-started/kubernetes/installation/hosted/canal/canal.yaml

**此时查看集群的节点状态**

#kubectl	get node

|NAME|STATU|ROLES|AGE|VERSION|
|-|-|-|-|-|
|ubuntu-1|NotReady|<none>|27m|v1.10.1|
|ubuntu-2|NotReady|<none>|27m|v1.10.1|
|ubuntu-3|NotReady|<none>|27m|v1.10.1|
|ubuntu-master|NotReady|master|32m|v1.10.1|
