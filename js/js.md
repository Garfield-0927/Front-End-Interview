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

##### 1.1.1 引例

1. typeof能判断哪些类型？

2. 何时使用===何时使用==
3. 值类型和引用类型的区别
4. 手写深拷贝

##### 1.1.2 常见值类型（call by value）

- undefined
- string，如let a = ‘abc’

- number
- boolean
- symbol

##### 1.1.3 常见引用类型（call by reference）

- Object
- Array
- null

- Function

##### 1.1.4 typeof运算符

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

##### 1.1.5 深拷贝

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

##### 1.1.6 类型转换

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

##### 1.1.7 引例解答

1. typeof能判断哪些类型？

   答：能判断js中的基本数据类型，即number，string，boolean，symbol，undefined。以及能判断是否是一个函数。

2. 何时使用 == 何时使用 === 

   答：除了 == null 之外，其他一律使用 ===。

    `obj.a==null`相当于`obj.a === null || obj.a === undefined`

3. 值类型和引用类型的区别

   答：值类型存储在栈中，而引用类型实际上是一个变量指向堆中某个地址的指针，因此如果将某个引用类型赋值给某个变量，修改这个变量，会引起原本引用类型的改变。

4. 手写深拷贝

   答：见上文。这里简单写一下思路，首先判断是否为引用类型，注意判断是数组还是对象，递归调用。



#### 1.2 原型和原型链

##### 1.2.1 引例

1. 如何准确判断一个变量是不是数组？
2. 手写一个建议的jquery，考虑插件和扩展性。
3. class的原型本质，怎么理解？

##### 1.2.2 class

​		class实际上是ES6推出的创建类的语法糖，其本质还是function。让JavaScript看似是一门可以面向类来创建对象的语言。继承用extends。super表示执行父类中的构造函数。

```javascript
class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  sayHi(){
    console.log(`my name is ${this.name}, i'm ${this.age} years old`);
  }
}

class Student extends Person{
  constructor(name, age, number){
    super(name, age);
    this.number = number;
  }

  study(){
    console.log(`I'm studying`);
  }
}

let lilei = new Student("李雷", 18, 201910000);
console.log(lilei.age);			// 18
console.log(lilei.name);		// 李雷
lilei.sayHi();					// my name is 李雷, i'm 18 years old
lilei.study();		// I'm studying
```



##### 1.2.3 原型

​		很多人搞不清楚`__proto__`和`prototype`这两者的区别，包括我在一开始看参考书的时候，也是看的稀里糊涂的，这里就细细讲一下。

​		`__proto__`是每个实例所具有的，我们可以称其为隐式原型。

​		`prototype`是每个Class（或者说function）所具有的，我们可以称其为显示原型

​		而实例的隐式原型指向对应class的显示原型。

​		就拿上面的代码作为例子：

​		lilei这个实例有`__proto__`, 而Student这个class有`prototype`，lilei的`__proto__`指向Student的`prototype`。用代码来说就是 `lilei.__proto__ === Student.prototype`的值为true。

​		我们也可以通过图来形象理解：

![proto1](D:\garfield\wesharp\前端\前端面试\js\imgs\proto1.png)

##### 1.2.4 基于原型的执行规则

- 获取属性或者方法时
- 先在自身的方法和属性中寻找
- 如果找不到则去`__proto__`中寻找

##### 1.2.5 原型链

​		这里还是用上面的代码作为例子来阐释以下原型链。

![proto2](D:\garfield\wesharp\前端\前端面试\js\imgs\proto2.png)

​		Student的显示原型的隐式原型，即`Student.prototype.__proto__`是等于Person的显示原型，即`Person.prototype`。而Person的显式原型的隐式原型，`Person.prototype.__proto__`又等于Object的显示原型，`Object.prototype`。原型链的尽头就是Object.prototype。大家可以在浏览器的控制台中自行验证。而当我们需要访问lilei中的某个属性，或者某个方法，会沿着这条原型链一直找，直到找到或者找到原型链尽头。就比如我想使用lilei.hasOwnProperty这个方法，那么它就先在自己内部找有没有这个方法，发现没有，接着到Student.prototype中找，发现也没有，此时，因为Student是继承了Person，因此接下来会到Person.prototype中寻找，发现Person中也没，就会到Object.prototype中寻找，终于找到了！~

##### 1.2.6 instanceof工作原理

​		instanceof的实际工作原理就是基于原型链一层层往上找，如果后面跟的类型是存在于这个原型链之中的，就返回true，否则返回false。

​		还是拿上面的代码举例：

```javascript
lilei instanceof Student;	// true
lilei instanceof Person;	// true
lilei instanceof Object;	// true
lilei instanceof Array;		// false
```



##### 1.2.7 引例解答

1. 如何判断一个变量是不是数组类型

   答：instanceof即可。

2. 手写jQuery

   答：略

3. class的原型本质，怎么理解？

   答：class是es6推出的创建类的语法糖，本质上上还是基于function的原型链来模拟类的创建。



#### 1.3 作用域和闭包

##### 1.3.1 引例

1. this的不同应用场景，如何取值？
2. 手写bind函数，call函数，apply函数
3. 实际开发中闭包的应用场景，举例说明
4. 创建10个a标签，点击的时候单出来对应的序号

##### 1.3.2 作用域和自由变量

​		作用域有三种类型：

- 全局作用域：代码中直接var出一个变量，不受约束

- 函数作用域；在函数中，我们可以访问到函数中定义的变量，但是从函数外部，我们访问。

- 块级作用域：在{}中用let声明出的变量

  自由变量：

  ​		如果一个变量在当前作用域没有被定义，但是被使用了，js引擎就会像上级作用域一层一层依次寻找，直到找到位置，如果到全局作用域下都没找到，就会报错 xxx is not defined

##### 1.3.3 闭包

​		首先要明确一点：自由变量的查找是从函数定义的地方向上级作用域查找，不是在执行的地方！

```javascript
// 函数返回时用到了函数作用域中的变量
function fn(){
  const a = 200;
  return function () {
    console.log(a);
  }
}

const a = 10;
const b = fn();
b();		// 200

// 函数作为变量传进另外一个函数
function fn2 (fn1){
  return e;
}

function fn1(){
  const e = 200;
}
const e = 100;
const f = fn2(fn1);
console.log(f);   // 100
```



##### 1.3.4 this

​		this 是在**运行时进行绑定的**，并不是在编写时绑定，它的**上下文**取决于**函数调用时**的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

```javascript
function fn1(){
  console.log(this);
}
// 默认绑定
fn1();  // window

// 显示绑定
fn1.call({x:100})   // {x:100}
const fn2 = fn1.bind({a:10});
fn2();    // {a:10}

// new绑定
function foo(){
  console.log(this);
}
let bar = new foo();		// foo()
```

- 上面的fn1（）称为this的默认绑定，根据函数调用时的条件决定this的指向。
- 通过call，bind以及apply强行改变this的指向，这称其为显示绑定。
- 将this绑定到new出来的变量，称为new绑定
- 还有一种隐式绑定就是指通过对象调用里面的方法。此时this指向这个对象

```javascript
const per = {
  name:'garfield',
  logThis(){
    console.log(this);
  },
  wait(){
    setTimeout(() => {
      console.log(this);
    }, 0);
  },
  watiAgain(){
    setTimeout(function(){
      console.log(this);
    }, 100);
  }
}
per.wait();   // {name:'garfield', .......}
per.watiAgain()   // window
```

​		需要注意地是箭头函数和普通函数在一个对象中this指向的不同！

##### 1.3.5 引例解答

1. this的不同应用场景，如何取值？

   答：四种绑定方式——显示绑定，隐式绑定，new绑定，默认绑定。箭头函数和this的关系。

2. 手写bind函数，call函数，apply函数

   答：

   ```javascript
   // call
   Function.prototype.newCall = function (thisArg){
     if (thisArg == null) {
       thisArg = window;
       this();
     } else{
       let newArgs = [];
       for (let i=1; i< arguments.length; i++){
         newArgs.push(arguments[i]);
       }
       thisArg.newMethod = this;
       thisArg.newMethod(...newArgs);
       delete thisArg.newMethod;
     }
   }
   
   // 简易bind
   Function.prototype.newBind = function (thisArg){
     let thisFn = this;
     let newArgs = [];
     for (let i=1; i< arguments.length; i++){
       newArgs.push(arguments[i]);
     }
     let resfunction = ()=>{
       return thisFn.call(thisArg, ...newArgs)
     }
     return resfunction;
   }
   let fn2 = outputInfo.newBind(obj1, 1,2,3,4)
   fn2();
   
   // apply
   Function.prototype.newApply = function (thisArg){
     if (thisArg == null) {
       thisArg = window;
       this();
     } else{
       let newArgs = arguments[1];
       thisArg.newMethod = this;
       let res = thisArg.newMethod(...newArgs);
       delete thisArg.newMethod;
       return res;
     }
   }
   ```

   

3. 实际开发中闭包的应用场景，举例说明

   - 隐藏数据

     ```javascript
     function fn (){
       let PrivateData = {
         address:'shanghai pudong',
         married: false,
         phone: '1xxxxxxxxx',
         password: 'xxxx'
       }
       return {
         set: function (key, value){
           PrivateData[key] = value;
         },
     
         get: function (key){
           return PrivateData[key];
         }
       }
     }
     
     let bar = fn();
     bar.set('address', 'Hubei Wuhan')
     console.log(bar.get('married')); 
     console.log(bar.get('address'));
     ```

   - 防抖

     ```javascript
     /**
      * 
      * @param {执行函数}} fn 
      * @param {延迟} time 
      * @returns 
      */
     function debounce(fn, time){
       let timer = null;
       return function(){
         let args = Array.prototype.slice.call(arguments)
         if (timer) {
           clearTimeout(timer);
         }
         timer = setTimeout(()=>{
           fn.call(this, ...args)
         }, time)
       }
     }
     ```

   - 节流

     ```javascript
     /**
      * 
      * @param {function} fn 
      * @param {delay time} delay 
      * @returns 
      */
     function throttle(fn, delay){
       let timer;
       return function(){
         let args = Array.prototype.slice.call(arguments);
         let now = Date.now();
         if (!timer || now - timer > delay) {
           timer = now;
           fn.call(this,...args);
           return ;
         } else {
           timer = now;
           return ;
         }
       }
     }
     ```

     

4. 创建10个a标签，点击的时候单出来对应的序号

```javascript
let div = document.getElementById('tag');
for(let i = 0; i < 10; i++){
  let a;
  a = document.createElement('a');
  a.innerHTML = 'a标签' + '<br>';
  a.addEventListener('click',()=>{
    alert(i);
  })
  div.appendChild(a);
}
```



#### 1.4 Promise和Ajax

##### 1.4.1 promise

​		初步入门请见我另外一篇博客~这里就不赘述了。

​		

