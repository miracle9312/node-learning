# node 
***
## node特点
1. 异步：有如下场景，服务端正在处理如下几个任务t1,t2,t3，同步的处理方式是顺序执行，耗费时间是三者之和；异步可以同时执行，耗费时间是max(t1,t2,t3)。
2. 单线程：node在执行js时，该js片段只能在一个线程上执行，不能另起线程同时执行。
3. 跨平台：由于libuv对windows和linux的封装，可以直接在windows和linux上使用node

## 模块机制
### require(xxx)
* 搜索原则：逐级向上
* xxx="字母开头的字符串"：引用核心模块

##基于mobaxterm的node发布流程
1. 远程连接
* 打开mobax
* 点击session
* 输入ip,点击确定
* 输入root和密码
如下图
2. 添加用户并授权
3. nodejs环境搭建
* 安装常用软件
sudo wget vim openssl build-essential libssl-dev wget curl git
* 安装nvm(nvm时npm的版本管理工具)
wget -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
* 打开新窗口（注意要关闭之前的窗口）
nvm install v8.9.1
nvm use 8.9.1
4. nginx服务器代理
*  安装gcc
yum install gcc-c++
* 安装 pcre
yum install -y pcre pcre-devel
* 安装zlib
yum install -y zlib zlib -devel
* 安装 openssl
yum install -y openssl openssl-devel
* 下载niginx并安装
wget -c https://nginx.org/download/nginx-1.10.1.tar.gz
解压：tar -zxvf nginx-1.10.1.tar.gz
进入安装目录：cd nginx-1.10.1
默认配置：./configure
编译安装：make
		make install
* 测试是否安装成功
cd /usr/local/nginx/sbin/
./nginx -t
//插入图片
启动：./nginx
5. 常见错误
* 端口占用
解决:netstat -ntpl查看端口占用情况
//插入图片
执行 kill 3419
* 无权限
解决：sudo+命令
//插入图片

[baidu](www.baidu.com)
vvv

<img src="https://avatars2.githubusercontent.com/u/3265208?v=3&s=100" alt="GitHub" title="GitHub,Social Coding" width="50" height="50" />

# header1 #
## header2 ##
### header3 ###
 1 | 2 | 3 
 --- | --- | ---
shao | xue | zheng 
ni | zui | shuai 

>this is a quote任何像样的文本编辑器都能轻松地建立 email 型的引用。例如在 BBEdit 中，你可以选取文字后然后从选单中选择增加引用阶层。
>
>this is a quote任何像样的文本编辑器都能轻松地建立 email 型
>>的引用。例如在 BBEdit 中，你可以选取文字后然后从选单中选择增加引用阶层。

* unorder list
* unorder list

~~ffff~~

1. order list1 
2. order list2

3.  本书覆盖 ES6 与上一个版本 ES5 的所有不同之处，对涉及的	语法知识给予详细介绍，并给出大量简洁易懂的示例代码。

	本书为中级难度，适合已经掌握 ES5 的读者，用来了解这门	语言的最新发展；也可当作参考手册，查寻新增的语法点。

	全书已由电子工业出版社出版，2017年9月推出了第三版，	书名为《ES6 标准入门》。纸版是基于网站内容排版印刷	的。
``` js
function out() {
  const bigData = new Buffer(100);
  inner = function () {
    void bigData;
  }
}
```

