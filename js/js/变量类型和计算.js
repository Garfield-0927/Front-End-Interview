// let a;
// const str = 'abc';
// const n = 100;
// const b = true;
// const s = Symbol('s')
// console.log(typeof a);    // undefined
// console.log(typeof str);  // string
// console.log(typeof n);    // number
// console.log(typeof b);    // boolean
// console.log(typeof s);    // symbol
// console.log(typeof null);   // object
// console.log(typeof [1,2]);  // object
// console.log(typeof {x:1});  // object
// console.log(typeof function(){return 1});   // function


// let obj = {
//   name:'garfield',
//   age: 18,
//   address:{
//     province:'shanghai',
//     district:'pudong new area',
//   },
//   friend:['cephass', 'kevin']
// }


// let obj2 = DeepClone(obj);

// function DeepClone(obj){
//   // judge if the param is an object
//   if (typeof obj !== 'object' || obj == null) {
//     return obj;
//   }
//   // initialize the result
//   let res;
//   if (obj instanceof Array) {
//     res = [];
//   }else{
//     res = {};
//   }
//   // iterate the keys in obj
//   for (let key in obj){
//     // to exclude the native keys
//     if (obj.hasOwnProperty(key)) {
//       res[key] = DeepClone(obj[key])
//     }
//   }
//   return res;
// }


// let a = 100 + 10;   // 110
// let b = 100 + '10';   // "10010"
// let c = 100 + parseInt('10'); // 110
// let d = true + '110';   // "true110"
// console.log(a,b,c,d);

100 == '100'    // true
0 == ''   // ture
0 == false    // true 
false == ''   // true
null == undefined   // true