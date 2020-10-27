const { title } = require('process');
const readline = require('readline');

const { Write, overall } = require("./write");

function Progress(start, end, callback) {
  this.columns = process.stdout.columns//宽
  this.rows = process.stdout.rows//高
  this.start = start;
  this.end = end;
  this.title = "进度条"
  this.callback = callback || function (columns, start, end) {
    let title = new Write([36], this.title);//设置了一个颜色文字
    title.add([0], ":");//一个装饰

    columns -= this.title.length;
    columns -= Math.round(columns / 2.5);//计算进度条多长好

    title.add([36, 1], "[")//一个装饰

    for (let i = 0; i < columns; i++) {
      if (Math.round(start / end * columns) > i) {
        title.add([1, 42], ".")
      } else title.add([1], ".")
    }
    title.add([36, 1], "]").add([32], Math.round(start / end * 100) + "%").write();//输出进度条
  };
}
Progress.prototype.finish = function (str = "") {
  this.start = this.end; this.log(); new Write([0], str).log();
}
Progress.prototype.set = function (i) {
  this.start = i; this.log()
}
Progress.prototype.log = function () {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, this.rows)
  this.callback(this.columns, this.start, this.end)
}
// let pro = new Progress(0, 100)
// let i = 0
// let time = setInterval(() => {
//   i += 10;
//   if (i == 100) { pro.finish(); return clearInterval(time) }
//   pro.set(i);
// }, 500)
// Write.style()
module.exports = {
  Progress, Write, overall
}
