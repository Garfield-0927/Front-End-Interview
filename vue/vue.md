

**1. 什么是 MVVM？**

​	MVVM 是 Model-View-ViewModel 的缩写，MVVM 是一种设计思想。

​	Model 层代表数据模式，也可以在 Model 中定义数据修改和操作的业务逻辑；

​	View 代表 UI 组件，它负责将数据模型转化为 UI 展现出来，

​	ViewModel 是一个同步 View 和 Model 的对象。



**2.vue父组件向子组件传递数据？**
答：通过props

```vue
In father components:
<childComp :name="name"/>

In child components:
props:{
	name:{
		type: String,
		default(){
			return "hello"
		}
	}
}
```



**3.子组件像父组件传递事件？**
答：$emit方法。

在子组件中发出事件: `this.$emit("childEvent", args)`

在父组件中监听事件: 在标签内 `:childEvent = "childEvent"`



**4.v-show和v-if指令的共同点和不同点？**
答: 

共同点：都能控制元素的显示和隐藏；
不同点：实现本质方法不同，v-show本质就是通过控制css中的display设置为none，控制隐藏，只会编译一次；v-if是动态的向DOM树内添加或者删除DOM元素，若初始值为false，就不会编译了。而且v-if不停的销毁和创建比较消耗性能。
总结：如果要频繁切换某节点，使用v-show(切换开销比较小，初始开销较大)。如果不需要频繁切换某节点使用v-if（初始渲染开销较小，切换开销比较大）。



**5.如何获取dom?**
答：ref="domName" 用法：this.$refs.domName



**6.为什么使用key?**
答：需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点。
作用主要是为了高效的更新虚拟DOM。



**7.vue组件中data为什么必须是一个函数？**
答：组建中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，它们只负责各自维护的数据，不会造成混乱。而单纯的写成对象形式，就是所有的组件实例共用了一个data，这样改一个全都改了。



**8.Vuex 是什么？哪种功能场景使用它？**

答：Vuex 是专门为 Vue.js 设计的状态管理模式，它采用集中式储存管理 Vue 应用中所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。 



**9. Vuex 有哪几种属性？**

state：基本数据

mutations：提交更改数据的方法，同步！

actions：像一个装饰器，包裹 mutations，使之可以异步。

modules：模块化 Vuex。



**10. Vue 生命周期总共有几个阶段？**

beforeCreate 创建前

created 创建后

beforeMount 载入前

mounted 载入后

beforeUpdate 更新前

updated 更新后

beforeDestroy 销毁前

destroyed 销毁后



**11. $route和 $router的区别是什么？**

- $router为VueRouter的实例，是一个全局路由对象，包含了路由跳转的方法、钩子函数等。
- $route 是路由信息对象||跳转的路由对象，每一个路由都会有一个route对象，是一个局部对象，包含path,params,hash,query,fullPath,matched,name等路由信息参数。





### 虚拟DOM以及Diff算法

##### 1. vue数据变化以及渲染的流程

数据改变 ->  虚拟DOM（计算变更） -> 操作真实DOM -> 视图更新

##### 2. 什么是虚拟DOM

就是用JS模拟DOM结构。举个例子：

```html
<div id="app" class="container">
  <h1>虚拟DOM</h1>
  <ul style="color: orange">
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>
```

```javascript
// 上面html对应的虚拟DOM
{
  tag: 'div',
  props: {
    id: 'app',
    className: 'container'
  },
  children: [
    {
      tag: 'h1',
      children: '虚拟DOM'
    },
    {
      tag: 'ul',
      props: {
        style: 'color: orange'
      },
      children: [
        {
          tag: 'li',
          children: 'A'
        },
        {
          tag: 'li',
          children: 'A'
        },
        {
          tag: 'li',
          children: 'A'
        },
      ]
    }
  ]
}
```



