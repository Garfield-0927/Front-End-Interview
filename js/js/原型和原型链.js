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
console.log(lilei.age);
console.log(lilei.name);
lilei.sayHi();
lilei.study();