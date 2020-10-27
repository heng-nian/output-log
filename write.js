/*
\x1B === \033
\033[背景色编号;字色编号m  
  背景色编号和字色编号的先后顺序随便
  如 \033[1;101m
*/
function Write(i = [0], str) {
  if (!str) { this.data = ""; }
  else { this.data = ["\033[", i.join(";"), "m", str, "\033[0m"].join(""); }
}
Write.style = function () {
  // 1 - 加粗   4 - 下划线  7 - 反显:前景色与背景色交换。
  // 30 - 37 字体颜色 
  // 40 - 47 背景颜色
  // 90 - 97 高亮字体颜色
  // 100 - 107 高亮背景颜色
  process.stdout.write("\033[1m1-加粗\033[0m");
  process.stdout.write("\033[1m\033[4m4-下划线\033[0m");
  process.stdout.write("\033[7m7-反显\033[0m");
  for (let i = 30; i <= 37; i++)process.stdout.write(["\033[", i, "m", i, "\033[0m"].join(""));
  for (let i = 40; i <= 47; i++)process.stdout.write(["\033[", i, "m", i, "\033[0m"].join(""));
  for (let i = 90; i <= 97; i++)process.stdout.write(["\033[", i, "m", i, "\033[0m"].join(""));
  for (let i = 100; i <= 107; i++)process.stdout.write(["\033[", i, "m", i, "\033[0m"].join(""));
}
Write.prototype.add = function (i, str) {
  this.data += ["\033[", i.join(";"), "m", str, "\033[0m"].join("");
  return this;
}
Write.prototype.log = function (data = "") { console.log(this.data + data) }
Write.prototype.write = function (code = 'utf-8') { process.stdout.write(this.data, code) }

function overall() {
  String.prototype.set = function (...style) {
    if (!style || style.length == 0) return this.toString();
    return ["\033[", style.join(";"), "m", this, "\033[0m"].join("");
  }
  String.prototype.add = function (style, text) {
    return this + text.set(style)
  }
  String.prototype.write = function (code = "utf-8") {
    let str = this.toString(); process.stdout.write(str, code);
    return str;
  }
  String.prototype.log = function (text = "") {
    let str = this + text; console.log(str);
    return str;
  }
}
module.exports = {
  Write, overall
}