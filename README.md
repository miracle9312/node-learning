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

