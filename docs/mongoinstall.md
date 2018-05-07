# mongo安装
1. 下载 [mongo](https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.6.4-signed.msi/download)

2. 点击安装

3. 创建数据目录和日志目录
* 置于根目录（c:或e:或其他）
* 执行如下命令行
    ```
    e:\>mkdir data
    e:\data> mkdir db
    e:\data> mkdir log
    ```
* 在安装目录下创建配置文件e:\mongo\mongod.cfg
  ```
  systemLog:
      destination: file
      path: e:\data\log\mongod.log
  storage:
      dbPath: e:\data\db
  ```
4. 安装服务
    ```
    e:\mongo\bin\mongod.exe --config "C:\mongodb\mongod.cfg" --install
    ```
5. 启动
* 进入e:\mongo\bin>mongod
* 另开命令行工具，进入e:\mongo\bin\mongo.exe
建立连接
* 测试是否成功在mongoshell中输入
    ```
    >db
    test
    ```
