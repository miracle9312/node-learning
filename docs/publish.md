## 基于xshell的node发布流程
### 环境
* 阿里云轻量应用服务器（centOS）
* node v8.9.1
* xshell6.0

### 1. 远程连接
* 打开xshell 新建会话 输入ip

* 点击session
* 输入ip,点击确定
* 输入root和密码

// 插入图片

### 2. 添加用户并授权
### 3. nodejs环境搭建
* 安装常用软件

sudo wget vim openssl build-essential libssl-dev wget curl git

* 安装nvm(nvm时npm的版本管理工具)

wget -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

* 打开新窗口（注意要关闭之前的窗口）

nvm install v8.9.1

nvm use 8.9.1

### 4. nginx服务器代理
*  安装gcc
>yum install gcc-c++
* 安装 pcre
>yum install -y pcre pcre-devel
* 安装zlib
>yum install -y zlib zlib -devel
* 安装 openssl
>yum install -y openssl openssl-devel
* 下载niginx并安装
>wget -c https://nginx.org/download/nginx-1.10.1.tar.gz

>解压：tar -zxvf nginx-1.10.1.tar.gz

>进入安装目录：cd nginx-1.10.1

> 默认配置：./configure

>编译安装：make

>make install
* 测试是否安装成功

>cd /usr/local/nginx/sbin/

>./nginx -t

>//插入图片

>启动：./nginx
### 5. 常见错误
* 端口占用

>解决:netstat -ntpl查看端口占用情况

//插入图片

>执行 kill 3419
* 无权限

>解决：sudo+命令

//插入图片
