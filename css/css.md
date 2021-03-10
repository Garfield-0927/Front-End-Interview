#### 1、三角形的绘制

如何用原生html+css绘制出一个三角形？

```html
<body>
  <div class="div1"></div>
</body>
```

```css
.div1 {
  width: 0;
  height: 0;
  border: 125px solid transparent;
  border-bottom-color: orange;
  margin: 40px auto;
}
```

原理：

​		如果一个盒子的长宽都为0，且盒子的border**都有**竖直，那么可以理解为如下图所示：

![triangle](.\imgs\triangle.png)

​		如果需要不同方向的三角形，那么只需要展示出你所需要的那个border就可以了。需要注意的是`  border: 125px solid transparent;`这一行必须要写，如果只定义border-bottom，那么将什么都不显示





#### 2、将正方形变成圆形

很简单

```css
.div{
    border-radius: 50%
}
```



#### 3、超出宽度的文本自动替换为省略号

单行省略

```css
.content{
    width:100px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
```

​		上面代码仅仅实现了一行文字的省略。逐一解释各行的意思：

- 设置宽度（否则盒子会自动被撑开）
- 强制文本在一行显示（nowrap的意思就是不换行）
- 隐藏溢出的内容
- 溢出进行省略



多行省略

第一种方法：通过`-webkit-box`私有属性来解决

```html
<body>
  <div class="div1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, cum eveniet, quisquam rerum laborum aut debitis molestiae id necessitatibus ullam dolores consequatur, sint voluptatem atque ea hic consequuntur error. Nesciunt?</div>
</body>
```

```css
.div1 {
  width:10%;
  height: 90px;
  border: 1px solid #000;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
```

1. 设置宽高
2. 隐藏溢出
3. 改变display为-webkit-box
4. 使子元素从上到下显示
5. 指定从第几行开始省略



第二种方法：使用原生css

```html
<body>
  <div class="div1">nt voluptatem atque ea hic consequuntur error. Nesciunt?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, cum eveniet, quisquam rerum laborum aut debitis molestiae id necessitatibus ullam dolores consequatur, sint voluptatem atque ea hic consequuntur error. Nesciunt?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, cum eveniet, quisquam rerum laborum aut debitis molestiae id necessitatibus ullam dolores consequatur, sint voluptatem atque ea hic consequuntur error. Nesciunt?</div>
</body>
```

```css
.div1 {
  width: 50%;
  height: 87px;
  border: 1px solid #000;
  overflow: hidden;
  position: relative;
  text-align: justify;		// 使文字对齐
  padding-right: 1em;		// 给省略号流出空间
}
.div1::before{
  content: "...";			// 省略号伪元素
  position: absolute;
  right: 0;
  bottom: 1px;
}
.div1::after{			// 用于覆盖省略号的伪元素
  content: "";
  width: 1em;
  height: 1em;
  position: absolute;
  display: inline;
  right: 0;
  margin-top: 0.5em;
  background-color: #fff;
}
```



![文本省略1](.\imgs\文本省略1.png)

![文本省略2](.\imgs\文本省略2.png)



原理：

- 实际上省略号也可以看作文本，可以用伪元素显示出来
- 那么怎么控制省略号的显隐呢？可以再创建一个伪元素，如果需要省略的时候就把它覆盖到省略号上去

优点：

- 原生css实现，无需考虑适配问题

缺点：

- 当文本仅有一行或者两行的情况下，省略号还是会出现



#### 4、水平居中

- text-align: center;

  适用于块级文本元素。

- margin: 0 auto;

  适用于有宽度的块级元素。

- left: 50%; transform: translateX(-50%);

  适用于脱离文档流的元素。

- flex布局中的justify-content: center;



#### 5、垂直居中

- 设置padding

- 设置文字line-height和父元素的高度相同

  需要注意的是在对p标签用line-height的时候，需要清除margin，使其margin为0；

  此外line-height的致命之处在于如果有多行文字，就不能使用line-height。

- flex布局中的align-items：center；或者align-contents：center；

  缺点：flex兼容性较差

- table布局（比较少用） 

  父元素设置display: table;

  子元素设置display: table-cell; vertical-align: middle;

- grid布局（目前最强大的布局），上手较难，这里不展开

- top+transform

  适用于脱离文档流的元素；

  top：50%；

  transform：translateY（-50%）；



#### 6、伪类和伪元素

伪类：

​		语法：选择器后面跟一个冒号，如`.top-bar:xxx`

​		特点：

- 可以有多个伪类相互拼接，也可以拼接伪元素（伪元素必须在最后一个）

  例如: `input:out-of-range:focus {background:gold;}`表示如果输入的值在所给区间之外，并且鼠标聚焦在input框上时，后面的样式生效。

- 它是基于DOM对元素进行操作，不产生新的DOM结点



常用伪类

- :link :visited :hover :active :focus

- :first-child :last-child :nth-child() :nth-of-type()

- :checked :disabled :valid :required

  

伪元素：

​		语法：选择器后面跟两个冒号，如`/top-bar::xxx`

​		特点：

- 只能由一个伪元素，不能与其他伪元素进行拼接，如果和伪类进行拼接，伪元素必须在最后一个。
- 它能够创建一个不存在DOM中的新对象



常用伪元素：

- ::before ::after
- ::first-letter ::fiest-line
- ::selection
- ::placeholder



#### 6、隐藏元素的方法

- display : none;

  特点：

  - 浏览器会进行重排和重绘，DOM结点会消失
  - 子元素也会跟着隐藏，即使子元素设置display为block也无效
  - transition失效
  - 自身绑定事件也不会触发
  - 不会影响被遮挡元素的触发事件

- visibility：hidden

  特点：

  - 浏览器会进行重绘但不会进行重排，DOM结点依旧存在
  - 子元素也会跟着隐藏，但是给子元素设置visibility：visible，子元素会显示
  - transition不会失效
  - 自身绑定事件不会触发
  - 不会影响被遮挡元素的触发事件

- opacity： 0

  - 浏览器不会进行重绘，DOM结点依旧存在
  - 子元素也会跟着隐藏
  - transition不会失效
  - 自身绑定事件可以触发
  - 会影响被遮挡元素的触发事件