// function fn1(){
//   console.log(this);
// }

// fn1();  // window

// fn1.call({x:100})   // {x:100}
// const fn2 = fn1.bind({a:10});
// fn2();    // {a:10}

// const per = {
//   name:'garfield',
//   logThis(){
//     console.log(this);
//   },
//   wait(){
//     setTimeout(() => {
//       console.log(this);
//     }, 0);
//   },
//   watiAgain(){
//     setTimeout(function(){
//       console.log(this);
//     }, 100);
//   }
// }
// per.wait();   // {name:'garfield', .......}
// per.watiAgain()   // window

// function foo(){
//   console.log(this);
// }
// let bar = new foo();


//手写call
// let obj1 = {
//   name : 'garfield',
//   age : 18
// }

// function outputInfo(a,b,c,d){
//   console.log(this.name);
//   console.log(this.age);
//   console.log(a,b,c,d);
// }

// Function.prototype.newCall = function (thisArg){
//   if (thisArg == null) {
//     thisArg = window;
//     this();
//   } else{
//     let newArgs = [];
//     for (let i=1; i< arguments.length; i++){
//       newArgs.push(arguments[i]);
//     }
//     thisArg.newMethod = this;
//     let res = thisArg.newMethod(...newArgs);
//     delete thisArg.newMethod;
//     return res;
//   }
// }
// outputInfo.newCall(obj1,1,2,3,4)

// let fn2 = outputInfo.bind(obj1, 1,2,3,4)
// fn2();

// Function.prototype.newBind = function (thisArg){
//   let thisFn = this;
//   let newArgs = [];
//   for (let i=1; i< arguments.length; i++){
//     newArgs.push(arguments[i]);
//   }

//   let resfunction = ()=>{
//     return thisFn.call(thisArg, ...newArgs)
//   }

//   return resfunction;
// }
// let fn2 = outputInfo.newBind(obj1, 1,2,3,4)
// fn2();


// Function.prototype.newApply = function (thisArg){
//   if (thisArg == null) {
//     thisArg = window;
//     this();
//   } else{
//     let newArgs = arguments[1];
//     thisArg.newMethod = this;
//     let res = thisArg.newMethod(...newArgs);
//     delete thisArg.newMethod;
//     return res;
//   }
// }
// outputInfo.newApply(obj1, [1,2,3,4])


// 闭包实际应用
// 1. privatalize data
// function fn (){
//   let PrivateData = {
//     address:'shanghai pudong',
//     married: false,
//     phone: '1xxxxxxxxx',
//     password: 'xxxx'
//   }
//   return {
//     set: function (key, value){
//       PrivateData[key] = value;
//     },

//     get: function (key){
//       return PrivateData[key];
//     }
//   }
// }

// let bar = fn();
// bar.set('address', 'Hubei Wuhan')
// console.log(bar.get('married')); 
// console.log(bar.get('address'));


// /**
//  * 
//  * @param {执行函数}} fn 
//  * @param {延迟} time 
//  * @returns 
//  */
// function debounce(fn, time){
//   let timer = null;
//   return function(){
//     let args = Array.prototype.slice.call(arguments)
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(()=>{
//       fn.call(this, ...args)
//     }, time)
//   }
// }

// function sayHi(a,b){
//   console.log(a);
//   console.log(b);
// }
// debounce(sayHi,200)(111,222)

// /**
//  * 
//  * @param {function} fn 
//  * @param {delay time} delay 
//  * @returns 
//  */
// function throttle(fn, delay){
//   let timer;
//   return function(){
//     let args = Array.prototype.slice.call(arguments);
//     let now = Date.now();
//     if (!timer || now - timer > delay) {
//       timer = now;
//       fn.call(this,...args);
//       return ;
//     } else {
//       timer = now;
//       return ;
//     }
//   }
// }

// function btnevent(){
//   console.log('111');
// }
// let btn = throttle(btnevent,2000);


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