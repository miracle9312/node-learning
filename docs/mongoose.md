
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
增 | new model({key, value}), model.create({})
删 | model.remove({querycondition})
改1 | model.find()->data.key = value/data.set({key,value})->scema.save()
改2 | model.update({'query', {$set:{key, vakue}}})

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

## Discriminators(表继承)
1. 用途：人->[黑人，白人，黄种人]->[...]在建立这种
具有分类性质的表结构时，子表中往往都会有父表的相同属性，为了不重复声明
已声明过的字段，可以只建立一个顶级的通用表，将其他的表都作为其扩展形式。
2. 方式：
    ```
    var extensionModel = natualModel.discriminator('name',{
       prop1:value1
       ...
    })
    ```
3. 特性
    * 所有子表的数据都存储在通用表中
    * extensionModel.__t可以查询出数据属于那张子表
    * 可以对子表进行find,count,aggregate操作
    * 对子表的操作将触发父表的所有中间件
    * discriminator's field is always precedence except _id
    * Model.create()，可以自动将数据存储在相应的表中
    * 可在subdocument中直接定义discriminator

## populate(联表查询)
 操作名 | 方式
     --- | ---
     populate | 表现一对多关系，通过［多］方的_id关联
     dynamic populate | 表现一对多个多类，通过将［多］方的model用refPath表达
     virtual populate | 将populate的关联关系用除_id之外的字段建立