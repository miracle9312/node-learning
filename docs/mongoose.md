
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
增 | new schema({key, value}), schema.create({})
删 | schema.remove({key,value})
改1 | schema.find()->data.key = value/data.set({key,value})->scema.save()
改2 | schema.update({'query', {$set:{key, vakue}}})

## subdocuments
``` var childSchema = new Schema({ name: 'string' });

   var parentSchema = new Schema({
     // Array of subdocuments
     children: [childSchema],
     // Single nested subdocuments. Caveat: single nested subdocs only work
     // in mongoose >= 4.2.0
     child: childSchema
   });
   ```
* subdocument的save在父document save之后自动执行，而没有单独的save操作
* **执行顺序：top document validate->subdocument save
->subdocument validate-> top document save**
* subdocument的增删改查

    操作名 | 方式
    --- | ---
    增 | parent.children.push()
    删 | parent.children.id(_id).remove()
    改 | parent.children[0].key = value
    查 | parent.children.id(_id)
## Queries
* 简单查询
    ```
    var Person = mongoose.model('Person', yourSchema);
        Person.find({condition})
              .condition1({con1})
              .condition2({con2})
              .exec(callback);
    ```

* 联表查询[population]
* 查询事件
    ```
    var cursor = Person.find({ occupation: /host/ }).cursor();
    cursor.on('data', function(doc) {
      // Called once for every document
    });
    cursor.on('close', function() {
      // Called when done
    });
    ```

## Validation
1. 五个特性
    * 声明在字段
    * 在pre('save', cb)之前执行
    * 验证方法调用： validate(), validateSync()
    * 不对未定义的字段进行验证
2. 内嵌验证方式
    * all: required
    * Number:min,max
    * String: enum, match, maxlength, minlength
3. 如何设置unique Option

