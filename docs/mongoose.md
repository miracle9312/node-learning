
## quikstart
创建连接 | mongoose.connect(uri,options)
--- | ---
建表 | mongoose.model(schemaName,schema)
新增数据 | new Schema({key,value})
查表 | shcema.find,schema.findById 
添加方法 | schema.methods.fn=function(){}

## shema:`` new Shema({name:options}) ``
* options
  1. alias：设置虚拟路径
  2. type:mixed：数据可以是任意类型
  3. index,ObjectIds?
  
* schema.path():查看数据信息

## models 数据增删改查
操作名 | 方式
--- | ---
增 | new schema({key, value})
删 | schema.remove({key,value})
改1 | schema.find()->data.key = value/data.set({key,value})->scema.save()
改2 | schema.update({'query', {$set:{key, vakue}}})
