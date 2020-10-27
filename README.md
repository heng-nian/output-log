# output-log
一个简单的node.js的控制台输出进度条和颜色的模块
### 使用方法
<p>引入模块的index.js文件</p>

```javascript
let pro = new Progress(0, 100)
let i = 0
let time = setInterval(() => {
  i += 5;
  if (i == 100) { pro.finish(); return clearInterval(time) }
  pro.set(i);
}, 500)
```
<p>但是有时候默认的进度条样子满足不了那就自己来</p>

```javascript
let pro = new Progress(0, 100,function (columns, start, end) {
    let title = new Write([36], this.title);//设置了一个颜色文字
    title.add([0], ":");//一个装饰

    columns -= this.title.length;
    columns -= Math.round(columns / 2.5);//计算进度条多长好

    title.add([36, 1], "[")//一个装饰

    for (let i = 0; i < columns; i++) {
      if (Math.round(start / end * columns) > i) {
        title.add([1, 42], ".")
      } else title.add([1], ".")
    })
let i = 0
let time = setInterval(() => {
  i += 5;
  if (i == 100) { pro.finish(); return clearInterval(time) }
  pro.set(i);
}, 500)
```
<p>当然还附带了输出颜色字</p>

```javascript
const { Write, overall } = require("./write");
new Write().add([1,36],"你好").log();
```

<p>不过那么多颜色咋选,干脆控制台列出来就好了，方便点</p>

```javascript
const { Write, overall } = require("./write");
Write.style()
```
<h4>总体来说，参考意义比使用意义大</h4>

