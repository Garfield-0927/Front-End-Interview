function fn(){
  const a = 200;
  return function () {
    console.log(a);
  }
}

const a = 10;
const b = fn();
b();

function fn2 (fn1){
  return e;
}

function fn1(){
  const e = 200;
}
const e = 100;
const f = fn2(fn1);
console.log(f);   // 100