### 0、知识点

#### js基础知识

- 变量类型和计算
  - 值类型和引用类型
  - 类型判断
  - 逻辑运算

- 原型和原型链
  - class
  - 继承
  - 原型
  - 原型链
  - instanceof

- 作用域和闭包
  - 作用域
  - 自由变量
  - 闭包
  - this

- 异步
  - 单线程
  - callback
  - 应用场景
  - promise

- 模块化
  - ES6 Module

#### js-web-api

- DOM
  - 树形结构
  - 节点操作
  - 属性
  - 树结构操作
  - 性能

- BOM
  - navigator
  - screen
  - location
  - history

- 事件
  - 绑定
  - 冒泡
  - 代理

- ajax
  - XMLHttpRequest
  - 状态码
  - 跨域

- 存储
  - cookie
  - localStorage
  - sessionStorage



### 1、Javascript基础

#### 1.1 变量类型和计算

引例：

1. typeof能判断哪些类型？

2. 何时使用===何时使用==
3. 值类型和引用类型的区别
4. 手写深拷贝

##### 常见值类型（call by value）

- undefined
- string，如let a = ‘abc’

- number
- boolean
- symbol

##### 常见引用类型（call by reference）

- Object
- Array
- null

- Function

##### typeof运算符

作用：

- 识别所有值类型
- 识别函数
- 判断是否是引用类型

```javascript
let a;
const str = 'abc';
const n = 100;
const b = true;
const s = Symbol('s')
console.log(typeof a);    // undefined
console.log(typeof str);  // string
console.log(typeof n);    // number
console.log(typeof b);    // boolean
console.log(typeof s);    // symbol
console.log(typeof null);   // object
console.log(typeof [1,2]);  // object
console.log(typeof {x:1});  // object
console.log(typeof function(){return 1});   // function
```

##### 深拷贝

```javascript
function DeepClone(obj){
  // judge if the param is an object
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }
  // initialize the result
  let res;
  if (obj instanceof Array) {
    res = [];
  }else{
    res = {};
  }
  // iterate the keys in obj
  for (let key in obj){
    // to exclude the native keys
    if (obj.hasOwnProperty(key)) {
      res[key] = DeepClone(obj[key])
    }
  }
  return res;
}
```

##### 类型转换

- 字符串拼接

  ```javascript
  let a = 100 + 10;   // 110
  let b = 100 + '10';   // "10010"
  let c = 100 + parseInt('10'); // 110
  let d = true + '110';   // "true110"
  ```

- ==和===

  ```javascript
  100 == '100'    // true
  0 == ''   // ture
  0 == false    // true 
  false == ''   // true
  null == undefined   // true
  ```

  ​		因此为了避免这种类型转换，我们在实际开发中使用 === ，只有在判断是否为null的时候，才会使用 == 。